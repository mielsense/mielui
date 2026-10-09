<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { onDestroy } from 'svelte';
    import { disclosureSlide } from '../../components/_internal/disclosure/slide';
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
        transition:disclosureSlide
        onintrostart={handleIntroStart}
        onintroend={handleIntroEnd}
        onoutrostart={handleOutroStart}
        onoutroend={handleOutroEnd}
        class={cn(
            className,
            'flex flex-col gap-1.5 overflow-hidden',
            tool.variant === 'quiet'
                ? 'ms-[calc(var(--spacing)*1.75)] mt-1 border-s-[length:var(--border-size)] border-border py-0.5 ps-3'
                : 'mielui-inset-surface mt-[var(--mielui-modal-inset)] px-2 py-2'
        )}
    >
        {@render children?.()}
    </div>
{/if}
