<script lang="ts">
    import { themedSlide } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { onDestroy } from 'svelte';
    import type { ReasoningContentProps } from '.';
    import { getReasoningContext } from './context.svelte';

    let {
        class: className,
        children,
        onintrostart,
        onintroend,
        onoutrostart,
        onoutroend,
        ...rest
    }: ReasoningContentProps = $props();
    const reasoning = getReasoningContext();
    const unregister = reasoning.registerContent();
    let transitionRevision = 0;
    onDestroy(unregister);

    type TransitionEvent = CustomEvent<null> & {
        currentTarget: EventTarget & HTMLDivElement;
    };

    function handleIntroStart(event: TransitionEvent) {
        transitionRevision = reasoning.transitionStart(true);
        onintrostart?.(event);
    }

    function handleIntroEnd(event: TransitionEvent) {
        reasoning.transitionComplete(true, transitionRevision);
        onintroend?.(event);
    }

    function handleOutroStart(event: TransitionEvent) {
        transitionRevision = reasoning.transitionStart(false);
        onoutrostart?.(event);
    }

    function handleOutroEnd(event: TransitionEvent) {
        reasoning.transitionComplete(false, transitionRevision);
        onoutroend?.(event);
    }
</script>

{#if reasoning.open}
    <div
        {...rest}
        id={`reasoning-${reasoning.id}`}
        data-ui="reasoning-content"
        inert={!reasoning.open}
        aria-hidden={!reasoning.open}
        transition:themedSlide={{ durationVar: '--motion-duration-panel', fallback: 220 }}
        onintrostart={handleIntroStart}
        onintroend={handleIntroEnd}
        onoutrostart={handleOutroStart}
        onoutroend={handleOutroEnd}
        class={cn(className, 'mt-1 overflow-hidden text-sm leading-body text-foreground-muted')}
    >
        {@render children?.()}
    </div>
{/if}
