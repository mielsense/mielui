<script lang="ts">
    import {
        ArrowDown01Icon as ChevronDown,
        AlertCircleIcon as CircleAlert,
        CheckmarkCircle02Icon as CircleCheck
    } from '@hugeicons/core-free-icons';
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Spinner } from '@mielui/svelte/components/spinner';
    import { cn, pressable } from '@mielui/svelte/utils';
    import { getContext } from 'svelte';
    import {
        DISCLOSURE_ICON_SIZE,
        disclosureChevron,
        disclosureTrigger
    } from '../../components/_internal/disclosure/variants';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { ToolLabels, ToolTriggerProps } from '.';
    import { getToolContext } from './context.svelte';

    let { children, class: className, onclick, ...rest }: ToolTriggerProps = $props();
    const labels = getContext<(() => ToolLabels | undefined) | undefined>('tool-labels');
    const tool = getToolContext();
    const id = tool.id;
    const open = $derived(tool.open);
    const state = $derived(tool.state);
    const name = $derived(tool.name);
    const duration = $derived(tool.duration);
    const variant = $derived(tool.variant);
    const durationMatch = $derived(duration?.match(/^(\d+)(?:\.(\d+))?(ms|s)$/));
    const numericDuration = $derived(Number.parseFloat(duration ?? ''));
    const canAnimateDuration = $derived(durationMatch !== null && Number.isFinite(numericDuration));

    function formatDuration(value: number) {
        const precision = Math.min(durationMatch?.[2]?.length ?? 0, 100);
        return `${value.toFixed(precision)}${durationMatch?.[3] ?? ''}`;
    }
    const label = $derived(
        state === 'running'
            ? (labels?.()?.running ?? 'Task running')
            : state === 'complete'
              ? (labels?.()?.complete ?? 'Task completed')
              : (labels?.()?.failed ?? 'Task failed')
    );
</script>

<button
    {...rest}
    type="button"
    data-ui="tool-trigger"
    use:pressable
    aria-expanded={open}
    aria-controls={`tool-${id}`}
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
            layout: variant === 'quiet' ? 'inline' : 'row',
            bleed: variant === 'quiet'
        })
    )}
>
    {#if children}
        {@render children({ open, state, name, duration })}
    {:else}
        {#if state === 'running'}
            <Spinner
                size={DISCLOSURE_ICON_SIZE}
                aria-hidden="true"
                class="size-3.5 shrink-0 text-foreground-muted"
            />
        {:else if state === 'error'}
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
                state === 'error' ? 'text-[var(--mielui-error-text)]' : 'text-foreground'
            )}
        >
            {label}
        </span>
        <span class="min-w-0 truncate text-foreground-muted">{name}</span>
        {#if duration}
            <span class="shrink-0 font-mono text-xs tabular-nums text-foreground-muted">
                {#if canAnimateDuration}
                    <span use:numberShuffle={{ value: numericDuration, format: formatDuration }}>
                        {duration}
                    </span>
                {:else}
                    {duration}
                {/if}
            </span>
        {/if}
        <HugeiconsIcon
            icon={ChevronDown}
            size={DISCLOSURE_ICON_SIZE}
            aria-hidden="true"
            class={cn(variant === 'quiet' ? '' : 'ms-auto', disclosureChevron({ open }))}
        />
    {/if}
</button>
