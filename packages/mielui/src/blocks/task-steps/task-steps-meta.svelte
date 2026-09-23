<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { TaskStepsMetaProps } from '.';
    import { getTaskStep } from './context.svelte';

    let { children, class: className, ...rest }: TaskStepsMetaProps = $props();
    const item = getTaskStep();
</script>
<span
    {...rest}
    data-ui="task-steps-meta"
    aria-hidden={item.status !== "done"}
    class={cn(className, "shrink-0 font-mono text-[length:var(--font-size-meta)] tabular-nums text-foreground-muted transition-opacity [transition-duration:var(--motion-duration-press)] motion-reduce:transition-none", item.status === "done" ? "opacity-100" : "opacity-0")}
>
    {@render children?.()}
</span>
