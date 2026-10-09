<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getContext } from 'svelte';
    import type { ToolInputProps, ToolLabels } from '.';

    let { label, children, class: className, ...rest }: ToolInputProps = $props();
    const labels = getContext<(() => ToolLabels | undefined) | undefined>('tool-labels');
</script>

<div
    data-ui="tool-input"
    class={cn(
        className,
        'flex min-w-0 flex-col gap-0.5 px-0.5'
    )}
    {...rest}
>
    <span class="text-xs [font-weight:var(--font-weight-label)] text-foreground-muted">
        {label ?? labels?.()?.input ?? 'Input'}
    </span>
    <pre class="overflow-x-auto font-mono text-xs leading-5 text-foreground"><code
            >{@render children?.()}</code
        ></pre>
</div>
