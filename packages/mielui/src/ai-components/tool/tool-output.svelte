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
        'flex min-w-0 flex-col gap-0.5 px-0.5 [[data-ui=tool-input]+&]:mt-1'
    )}
    {...rest}
>
    <span class="text-xs [font-weight:var(--font-weight-label)] text-foreground-muted">
        {label ?? labels?.()?.output ?? 'Output'}
    </span>
    <div class="font-mono text-xs leading-5 text-foreground">
        {@render children?.()}
    </div>
</div>
