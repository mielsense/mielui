<script lang="ts">
    import { themedSlide } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { onDestroy } from 'svelte';
    import type { ToolContentProps } from '.';
    import { getToolContext } from './context.svelte';

    let {
        class: className,
        children,
        onintrostart,
        onintroend,
        onoutrostart,
        onoutroend,
        ...rest
    }: ToolContentProps = $props();
    const tool = getToolContext();
    const unregister = tool.registerContent();
    let transitionRevision = 0;
    onDestroy(unregister);

    type TransitionEvent = CustomEvent<null> & {
        currentTarget: EventTarget & HTMLDivElement;
    };

    function handleIntroStart(event: TransitionEvent) {
        transitionRevision = tool.transitionStart(true);
        onintrostart?.(event);
    }

    function handleIntroEnd(event: TransitionEvent) {
        tool.transitionComplete(true, transitionRevision);
        onintroend?.(event);
    }

    function handleOutroStart(event: TransitionEvent) {
        transitionRevision = tool.transitionStart(false);
        onoutrostart?.(event);
    }

    function handleOutroEnd(event: TransitionEvent) {
        tool.transitionComplete(false, transitionRevision);
        onoutroend?.(event);
    }
</script>

{#if tool.open}
    <div
        {...rest}
        id={`tool-${tool.id}`}
        data-ui="tool-content"
        inert={!tool.open}
        aria-hidden={!tool.open}
        transition:themedSlide={{ durationVar: '--motion-duration-panel', fallback: 220 }}
        onintrostart={handleIntroStart}
        onintroend={handleIntroEnd}
        onoutrostart={handleOutroStart}
        onoutroend={handleOutroEnd}
        class={cn(className, 'mt-1 flex flex-col gap-1.5 pb-1', tool.variant === 'quiet' ? 'ml-0 px-0' : 'ml-5 px-3')}
    >
        {@render children?.()}
    </div>
{/if}
