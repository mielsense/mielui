function normalizeSpeed(speed: number) {
    return Number.isFinite(speed) ? Math.min(100, Math.max(1, speed)) : 20;
}

export function getRevealChunkSize(speed: number, characterChunkSize?: number) {
    if (characterChunkSize !== undefined && Number.isFinite(characterChunkSize)) {
        return Math.max(1, Math.floor(characterChunkSize));
    }
    const normalized = normalizeSpeed(speed);
    return normalized < 25 ? 1 : Math.max(1, Math.round((normalized - 25) / 10));
}

export function getRevealDelay(speed: number) {
    return Math.max(1, Math.round(100 / Math.sqrt(normalizeSpeed(speed))));
}

export function getRollDuration(speed: number) {
    return Math.round(1000 / Math.sqrt(normalizeSpeed(speed)));
}

export function getGraphemeEnds(text: string) {
    const ends: number[] = [];
    if (typeof Intl.Segmenter === 'function') {
        const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
        for (const segment of segmenter.segment(text)) {
            ends.push(segment.index + segment.segment.length);
        }
        return ends;
    }
    let offset = 0;
    for (const character of text) {
        offset += character.length;
        ends.push(offset);
    }
    return ends;
}

export function nextChunk(
    iterator: AsyncIterator<string>,
    signal: AbortSignal
): Promise<IteratorResult<string>> {
    return new Promise((resolve, reject) => {
        const cancel = () => {
            resolve({ done: true, value: undefined });
        };
        if (signal.aborted) {
            cancel();
            return;
        }
        signal.addEventListener('abort', cancel, { once: true });
        Promise.resolve()
            .then(() => {
                return signal.aborted ? { done: true as const, value: undefined } : iterator.next();
            })
            .then(
                (result) => {
                    signal.removeEventListener('abort', cancel);
                    resolve(result);
                },
                (error: unknown) => {
                    signal.removeEventListener('abort', cancel);
                    reject(error);
                }
            );
    });
}
