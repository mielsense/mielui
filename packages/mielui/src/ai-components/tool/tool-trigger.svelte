<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Spinner } from '@mielui/svelte/components/spinner';
    import { cn, pressable } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { ToolTriggerProps } from '.';
    import { getToolContext } from './context.svelte';

    let { children, class: className, onclick, ...rest }: ToolTriggerProps = $props();
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
            ? 'Task running'
            : state === 'complete'
              ? 'Task completed'
              : 'Task failed'
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
            'mielui-press flex min-h-8 w-full items-center gap-1.5 text-left transition-[background-color,color,transform,scale] [transition-duration:var(--motion-duration-hover),var(--motion-duration-press)] ease-[var(--ease-press)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]',
            variant === 'quiet'
                ? 'min-h-6 w-auto max-w-full px-0 py-0 text-foreground hover:bg-transparent'
                : 'rounded-[var(--radius-md)] px-3 py-1.5 hover:bg-secondary/60'
        )}
>
    {#if children}
        {@render children({ open, state, name, duration })}
    {:else}
        <HugeiconsIcon
            icon={ChevronDown}
            size={14}
            aria-hidden="true"
            class={`shrink-0 text-foreground-muted transition-transform [transition-duration:var(--motion-duration-hover)] ${open ? '' : '-rotate-90'}`}
        />
        {#if state === 'running'}
            <Spinner size={14} aria-hidden="true" class="text-foreground-muted" />
        {/if}
        <span
            class={cn(
                    variant === 'quiet' ? 'text-current' : 'text-foreground',
                    state === 'complete' && 'font-[var(--font-weight-label)]'
                )}
        >
            {label}
        </span>
        <span class="min-w-0 flex-1 truncate text-foreground-muted">{name}</span>
        {#if duration}
            <span class="ml-2 shrink-0 font-mono text-xs tabular-nums text-foreground-muted">
                {#if canAnimateDuration}
                    <span use:numberShuffle={{ value: numericDuration, format: formatDuration }}>
                        {duration}
                    </span>
                {:else}
                    {duration}
                {/if}
            </span>
        {/if}
    {/if}
</button>
