<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { ToolInputProps } from '.';

    let { label = 'Input', children, class: className, ...rest }: ToolInputProps = $props();
</script>

<div
    data-ui="tool-input"
    class={cn(
        className,
        'flex flex-col gap-1 rounded-[var(--radius-md)] bg-secondary/50 px-2.5 py-2 [&:has(+[data-ui=tool-output])]:rounded-b-none'
    )}
    {...rest}
>
    <span class="text-xs [font-weight:var(--font-weight-label)] text-foreground-muted">
        {label}
    </span>
    <pre class="overflow-x-auto font-mono text-xs leading-5 text-foreground"><code
            >{@render children?.()}</code
        ></pre>
</div>
