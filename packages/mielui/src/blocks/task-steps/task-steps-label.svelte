<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { TaskStepsLabelProps } from '.';
    import { getTaskStep } from './context.svelte';

    let { children, class: className, ...rest }: TaskStepsLabelProps = $props();
    const item = getTaskStep();
</script>
<span
    {...rest}
    data-ui="task-steps-label"
    class={cn(className, "min-w-0 flex-1 truncate text-[length:var(--font-size-label)] transition-colors [transition-duration:var(--motion-duration-press)] motion-reduce:transition-none", item.status === "pending" ? "text-foreground-muted/65" : item.status === "error" ? "font-[var(--font-weight-label)] text-error" : "text-foreground", item.status === "active" && "font-[var(--font-weight-label)]")}
>
    {@render children?.()}
</span>
