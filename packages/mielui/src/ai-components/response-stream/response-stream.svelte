<script lang="ts">
    import { getCssDuration } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import type { ScrittoProps } from '@scritto/core';
    import { type Component, onMount } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { prefersReducedMotion } from 'svelte/motion';
    import type { ResponseStreamProps } from '.';
    import { createResponseStream } from './stream.svelte';
    import { getRollDuration } from './stream-utils';

    let {
        textStream,
        streaming = false,
        speed = 20,
        characterChunkSize,
        onComplete,
        onError,
        as = 'span',
        class: className,
        ...rest
    }: ResponseStreamProps = $props();

    let motionDuration = $state(180);
    const instant = $derived(prefersReducedMotion.current || motionDuration === 0);

    const stream = createResponseStream({
        get textStream() {
            return textStream;
        },
        get streaming() {
            return streaming;
        },
        get speed() {
            return speed;
        },
        get characterChunkSize() {
            return characterChunkSize;
        },
        get instant() {
            return instant;
        },
        get onComplete() {
            return onComplete;
        },
        get onError() {
            return onError;
        }
    });
    let box = $state<HTMLElement>();

    onMount(() => {
        if (!box) {
            return;
        }
        const element = box;
        function updateMotion() {
            motionDuration = getCssDuration(element, '--motion-duration-panel', 180);
        }
        updateMotion();
        const observer = new MutationObserver(updateMotion);
        for (
            let ancestor: HTMLElement | null = element;
            ancestor;
            ancestor = ancestor.parentElement
        ) {
            observer.observe(ancestor, { attributes: true, attributeFilter: ['class', 'style'] });
        }
        return () => {
            observer.disconnect();
        };
    });

    type ScrittoComponent = Component<ScrittoProps & HTMLAttributes<HTMLElement>>;
    let Scritto = $state<ScrittoComponent | null>(null);

    const canRoll =
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        typeof Element !== 'undefined' &&
        typeof Element.prototype.getAnimations === 'function';

    const rollTransition = $derived({
        duration: instant ? 0 : Math.min(getRollDuration(speed), motionDuration),
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
    });

    $effect(() => {
        if (!canRoll) {
            return;
        }
        let cancelled = false;
        import('@scritto/svelte')
            .then((module) => {
                if (!cancelled) {
                    Scritto = module.default as ScrittoComponent;
                }
            })
            .catch(() => {
                if (!cancelled) {
                    Scritto = null;
                }
            });

        return () => {
            cancelled = true;
        };
    });
</script>

<svelte:element
    this={as}
    bind:this={box}
    data-ui="response-stream"
    data-state={stream.state}
    aria-live="polite"
    aria-busy={streaming || !stream.complete}
    class={cn(
        className,
        'block font-medium whitespace-pre-wrap text-[length:var(--font-size-body)] leading-body text-foreground'
    )}
    {...rest}
>
    {#if Scritto && !instant && stream.text.length <= 4000}
        <Scritto value={stream.text} transition={rollTransition} />
    {:else}
        {stream.text}
    {/if}
    {#if stream.waiting}
        <span
            aria-hidden="true"
            data-ui="response-stream-caret"
            style:animation={instant ? 'none' : undefined}
            class="mielui-response-stream-caret ms-0.5 inline-block h-4 w-px -translate-y-px bg-foreground-muted align-middle"
        ></span>
    {/if}
</svelte:element>

<style>
    .mielui-response-stream-caret {
        animation: mielui-response-stream-caret 1.1s steps(1, end) infinite;
    }

    @keyframes mielui-response-stream-caret {
        50% {
            opacity: 0;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .mielui-response-stream-caret {
            animation: none;
        }
    }
</style>
