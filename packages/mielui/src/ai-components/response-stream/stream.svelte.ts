import { onDestroy, untrack } from 'svelte';
import { getGraphemeEnds, getRevealChunkSize, getRevealDelay, nextChunk } from './stream-utils';

type StreamOptions = {
    readonly textStream: string | AsyncIterable<string>;
    readonly streaming: boolean;
    readonly speed: number;
    readonly characterChunkSize: number | undefined;
    readonly instant: boolean;
    readonly onComplete: (() => void) | undefined;
    readonly onError: ((error: unknown) => void) | undefined;
};

export function createResponseStream(options: StreamOptions) {
    let displayedText = $state('');
    let isComplete = $state(false);
    let isWaiting = $state(false);
    let currentIndex = 0;
    let streamId = 0;
    let sourceKind: 'static' | 'snapshot' | 'finalized-snapshot' | 'async' | undefined;
    let previousSource: string | AsyncIterable<string> | undefined;
    let previousSnapshot = '';
    let animationFrame: number | undefined;
    let abortController: AbortController | undefined;
    let activeIterator: AsyncIterator<string> | undefined;

    function complete() {
        if (isComplete) {
            return;
        }
        isComplete = true;
        isWaiting = false;
        options.onComplete?.();
    }

    function stopStreaming() {
        streamId += 1;
        if (animationFrame !== undefined) {
            cancelAnimationFrame(animationFrame);
        }
        animationFrame = undefined;
        abortController?.abort();
        abortController = undefined;
        const iterator = activeIterator;
        activeIterator = undefined;
        if (iterator?.return) {
            try {
                void Promise.resolve(iterator.return()).catch(() => {});
            } catch {
                return;
            }
        }
    }

    function reset() {
        stopStreaming();
        currentIndex = 0;
        displayedText = '';
        isComplete = false;
        isWaiting = false;
    }

    function applySnapshot(text: string) {
        displayedText = text;
        previousSnapshot = text;
        isWaiting = text.length === 0;
    }

    function renderString(text: string, id: number) {
        if (options.instant || text.length === 0) {
            displayedText = text;
            complete();
            return;
        }
        const boundaries = getGraphemeEnds(text);
        let lastFrameTime = 0;

        const nextFrame = (timestamp: number) => {
            if (id !== streamId) {
                return;
            }
            if (timestamp - lastFrameTime < getRevealDelay(options.speed)) {
                animationFrame = requestAnimationFrame(nextFrame);
                return;
            }
            lastFrameTime = timestamp;

            const endIndex = Math.min(
                currentIndex + getRevealChunkSize(options.speed, options.characterChunkSize),
                boundaries.length
            );
            displayedText = text.slice(0, boundaries[endIndex - 1]);
            currentIndex = endIndex;

            if (endIndex < boundaries.length) {
                animationFrame = requestAnimationFrame(nextFrame);
            } else {
                complete();
            }
        };

        animationFrame = requestAnimationFrame(nextFrame);
    }

    async function renderAsync(stream: AsyncIterable<string>, id: number) {
        const controller = new AbortController();
        abortController = controller;

        try {
            const iterator = stream[Symbol.asyncIterator]();
            activeIterator = iterator;
            while (!controller.signal.aborted && id === streamId) {
                const result = await nextChunk(iterator, controller.signal);
                if (controller.signal.aborted || id !== streamId) {
                    return;
                }
                if (result.done) {
                    activeIterator = undefined;
                    complete();
                    return;
                }
                displayedText += result.value;
                if (displayedText.length > 0) {
                    isWaiting = false;
                }
            }
        } catch (error) {
            if (!controller.signal.aborted && id === streamId) {
                activeIterator = undefined;
                options.onError?.(error);
                if (!controller.signal.aborted && id === streamId) {
                    complete();
                }
            }
        }
    }

    function startAsync(stream: AsyncIterable<string>) {
        reset();
        const id = ++streamId;
        isWaiting = true;
        sourceKind = 'async';
        renderAsync(stream, id);
    }

    function update(textStream: string | AsyncIterable<string>, streaming: boolean) {
        if (typeof textStream !== 'string') {
            if (sourceKind !== 'async' || previousSource !== textStream) {
                previousSource = textStream;
                startAsync(textStream);
            }
            return;
        }

        if (streaming) {
            const fresh = sourceKind !== 'snapshot';
            if (fresh) {
                reset();
                sourceKind = 'snapshot';
                applySnapshot(textStream);
                return;
            }
            if (textStream === previousSnapshot) {
                return;
            }
            applySnapshot(textStream);
            return;
        }

        if (sourceKind === 'snapshot') {
            stopStreaming();
            if (textStream !== previousSnapshot) {
                applySnapshot(textStream);
            }
            sourceKind = 'finalized-snapshot';
            complete();
            return;
        }

        if (sourceKind === 'finalized-snapshot' && textStream === previousSnapshot) {
            return;
        }

        if (sourceKind === 'static' && previousSource === textStream) {
            if (options.instant && !isComplete) {
                stopStreaming();
                displayedText = textStream;
                complete();
            }
            return;
        }
        reset();
        const id = ++streamId;
        sourceKind = 'static';
        previousSource = textStream;
        renderString(textStream, id);
    }

    $effect(() => {
        const source = options.textStream;
        const streaming = options.streaming;
        options.instant;
        untrack(() => {
            update(source, streaming);
        });
    });

    onDestroy(stopStreaming);

    return {
        get text() {
            return displayedText;
        },
        get complete() {
            return isComplete;
        },
        get waiting() {
            return isWaiting;
        },
        get state() {
            return isWaiting ? 'waiting' : isComplete ? 'complete' : 'streaming';
        }
    };
}
