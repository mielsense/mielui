<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import { shimmer } from '@mielui/svelte/actions/shimmer';
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import { buttonAttributes } from '../../components/_internal/button-attributes';
    import {
        DISCLOSURE_ICON_SIZE,
        disclosureChevron,
        disclosureTrigger
    } from '../../components/_internal/disclosure/variants';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { ReasoningTriggerProps } from '.';
    import { findReasoningLabels, getReasoningContext } from './context.svelte';

    let { title, duration, children, class: className, ...rest }: ReasoningTriggerProps = $props();
    const labels = findReasoningLabels();
    const reasoning = getReasoningContext();
    const summary = $derived(title ?? labels?.()?.title ?? 'Draft');
    const thoughtFor = $derived(labels?.()?.thoughtFor);
</script>

<Button
    {...buttonAttributes(rest)}
    type="button"
    variant="ghost"
    data-ui="reasoning-trigger"
    aria-expanded={reasoning.open}
    aria-controls={`reasoning-${reasoning.id}`}
    onclick={() => {
        reasoning.open = !reasoning.open;
    }}
    class={cn(
        className,
        'h-auto flex-col items-start justify-center gap-0.5 py-1 whitespace-normal [font-size:var(--font-size-label)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-label)] leading-[var(--leading-body)] text-foreground-muted enabled:hover:text-foreground',
        disclosureTrigger({
            layout: 'inline',
            bleed: true
        })
    )}
>
    {#if children}
        {@render children({ open: reasoning.open, streaming: reasoning.streaming })}
    {:else}
        <span class="flex items-center gap-1.5">
            <span class="[font-weight:var(--font-weight-label)]">
                {#if reasoning.streaming}
                    <span use:shimmer class="inline-block">
                        {labels?.()?.thinking ?? 'Thinking'}
                    </span>
                {:else if duration && thoughtFor}
                    {thoughtFor(duration)}
                {:else if duration}
                    Thought
                    <span class="[font-weight:var(--font-weight-body)] tabular-nums">
                        {`for ${duration}`}
                    </span>
                {:else}
                    {labels?.()?.thought ?? 'Thought'}
                {/if}
            </span>
            <HugeiconsIcon
                icon={ChevronDown}
                size={DISCLOSURE_ICON_SIZE}
                aria-hidden="true"
                class={disclosureChevron({ open: reasoning.open })}
            />
        </span>
        {#if !reasoning.open}
            <span class="max-w-full text-pretty">{summary}</span>
        {/if}
    {/if}
</Button>
