<script lang="ts">
    import {
        ArrowDown01Icon as ChevronDown,
        AlertCircleIcon as CircleAlert,
        CheckmarkCircle02Icon as CircleCheck
    } from '@hugeicons/core-free-icons';
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Spinner } from '@mielui/svelte/components/spinner';
    import { cn, pressable } from '@mielui/svelte/utils';
    import {
        DISCLOSURE_ICON_SIZE,
        disclosureChevron,
        disclosureTrigger
    } from '../../components/_internal/disclosure/variants';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { ToolTriggerProps } from '.';
    import { findToolLabels, getToolContext } from './context';

    let { children, class: className, onclick, ...rest }: ToolTriggerProps = $props();
    const labels = findToolLabels();
    const tool = getToolContext();
    const durationMatch = $derived(tool.duration?.match(/^(\d+)(?:\.(\d+))?(ms|s)$/));
    const numericDuration = $derived(Number.parseFloat(tool.duration ?? ''));
    const canAnimateDuration = $derived(Boolean(durationMatch) && Number.isFinite(numericDuration));
    const label = $derived.by(() => {
        if (tool.state === 'running') {
            return labels?.()?.running ?? 'Task running';
        }

        if (tool.state === 'complete') {
            return labels?.()?.complete ?? 'Task completed';
        }

        return labels?.()?.failed ?? 'Task failed';
    });

    function formatDuration(value: number) {
        const precision = Math.min(durationMatch?.[2]?.length ?? 0, 100);
        return `${value.toFixed(precision)}${durationMatch?.[3] ?? ''}`;
    }
</script>

<button
    {...rest}
    type="button"
    data-ui="tool-trigger"
    use:pressable
    aria-expanded={tool.open}
    aria-controls={`tool-${tool.id}`}
    onclick={(event) => {
        onclick?.(event);
        if (!event.defaultPrevented) {
            tool.open = !tool.open;
        }
    }}
    class={cn(
        className,
        'text-foreground',
        disclosureTrigger({
            layout: tool.variant === 'quiet' ? 'inline' : 'row',
            bleed: tool.variant === 'quiet'
        })
    )}
>
    {#if children}
        {@render children({
            open: tool.open,
            state: tool.state,
            name: tool.name,
            duration: tool.duration
        })}
    {:else}
        {#if tool.state === 'running'}
            <Spinner
                size={DISCLOSURE_ICON_SIZE}
                aria-hidden="true"
                class="size-3.5 shrink-0 text-foreground-muted"
            />
        {:else if tool.state === 'error'}
            <HugeiconsIcon
                icon={CircleAlert}
                size={DISCLOSURE_ICON_SIZE}
                strokeWidth={2}
                aria-hidden="true"
                class="size-3.5 shrink-0 text-[var(--mielui-error-text)]"
            />
        {:else}
            <HugeiconsIcon
                icon={CircleCheck}
                size={DISCLOSURE_ICON_SIZE}
                aria-hidden="true"
                class="size-3.5 shrink-0 text-foreground-muted"
            />
        {/if}
        <span
            class={cn(
                'shrink-0 [font-weight:var(--font-weight-label)]',
                tool.state === 'error' ? 'text-[var(--mielui-error-text)]' : 'text-foreground'
            )}
        >
            {label}
        </span>
        <span class="min-w-0 truncate text-foreground-muted">{tool.name}</span>
        {#if tool.duration}
            <span class="shrink-0 font-mono text-xs tabular-nums text-foreground-muted">
                {#if canAnimateDuration}
                    <span use:numberShuffle={{ value: numericDuration, format: formatDuration }}>
                        {tool.duration}
                    </span>
                {:else}
                    {tool.duration}
                {/if}
            </span>
        {/if}
        <HugeiconsIcon
            icon={ChevronDown}
            size={DISCLOSURE_ICON_SIZE}
            aria-hidden="true"
            class={cn(
                tool.variant === 'quiet' ? '' : 'ms-auto',
                disclosureChevron({ open: tool.open })
            )}
        />
    {/if}
</button>
