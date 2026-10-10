<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { onDestroy } from 'svelte';
    import { disclosureSlide } from '../../components/_internal/disclosure/slide';
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
        transition:disclosureSlide
        onintrostart={handleIntroStart}
        onintroend={handleIntroEnd}
        onoutrostart={handleOutroStart}
        onoutroend={handleOutroEnd}
        class={cn(
            className,
            'mt-1 overflow-hidden border-s-[length:var(--border-size)] border-border ps-3 [font-size:var(--font-size-body)] leading-relaxed text-foreground-muted'
        )}
    >
        {@render children?.()}
    </div>
{/if}
