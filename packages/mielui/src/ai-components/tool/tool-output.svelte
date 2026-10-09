<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getContext } from 'svelte';
    import type { ToolLabels, ToolOutputProps } from '.';

    let { label, children, class: className, ...rest }: ToolOutputProps = $props();
    const labels = getContext<(() => ToolLabels | undefined) | undefined>('tool-labels');
</script>

<div
    data-ui="tool-output"
    class={cn(
        className,
        'flex flex-col gap-1 rounded-[var(--radius-md)] bg-secondary/50 px-2.5 py-2 [[data-ui=tool-input]+&]:-mt-1.5 [[data-ui=tool-input]+&]:rounded-t-none [[data-ui=tool-input]+&]:border-t-[length:var(--border-size)] [[data-ui=tool-input]+&]:border-border'
    )}
    {...rest}
>
    <span class="text-xs [font-weight:var(--font-weight-label)] text-foreground-muted">
        {label ?? labels?.()?.output ?? 'Output'}
    </span>
    <div class="text-sm leading-5 text-foreground">
        {@render children?.()}
    </div>
</div>
