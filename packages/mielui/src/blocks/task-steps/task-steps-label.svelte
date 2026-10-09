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
    class={cn(
        className,
        'min-w-0 flex-1 truncate text-[length:var(--font-size-label)] font-medium transition-colors [transition-duration:var(--motion-duration-hover)] motion-reduce:transition-none',
        item.status === 'pending'
            ? 'text-foreground-muted'
            : item.status === 'error'
              ? 'text-[var(--mielui-error-text)]'
              : 'text-foreground'
    )}
>
    {@render children?.()}
</span>
