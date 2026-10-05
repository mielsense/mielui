<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import { getContext } from 'svelte';
    import { buttonAttributes } from '../../components/_internal/button-attributes';
    import {
        DISCLOSURE_ICON_SIZE,
        disclosureChevron,
        disclosureTrigger
    } from '../../components/_internal/disclosure/variants';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { ReasoningLabels, ReasoningTriggerProps } from '.';
    import { getReasoningContext } from './context.svelte';

    let {
        title = 'Draft',
        duration,
        children,
        class: className,
        ...rest
    }: ReasoningTriggerProps = $props();
    const labels = getContext<(() => ReasoningLabels | undefined) | undefined>('reasoning-labels');
    const reasoning = getReasoningContext();
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
        'h-auto flex-col items-start justify-center gap-0.5 py-1 whitespace-normal [font-size:var(--font-size-body)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] leading-[var(--leading-body)] text-foreground-muted enabled:hover:text-foreground',
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
                    {labels?.()?.thinking ?? 'Thinking'}
                {:else if duration && labels?.()?.thoughtFor}
                    {labels?.()?.thoughtFor?.(duration)}
                {:else}
                    {labels?.()?.thought ?? 'Thought'}
                    {#if duration}
                        <span class="[font-weight:var(--font-weight-body)]">
                            {`for ${duration}`}
                        </span>
                    {/if}
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
            <span class="max-w-full text-pretty">{title}</span>
        {/if}
    {/if}
</Button>
