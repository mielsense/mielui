<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { TaskStepsItemProps } from '.';
    import { setTaskStep } from './context.svelte';

    let { status = 'pending', children, class: className, ...rest }: TaskStepsItemProps = $props();
    setTaskStep({
        get status() {
            return status;
        }
    });
</script>
<li
    {...rest}
    data-ui="task-steps-item"
    data-status={status}
    aria-current={status === 'active' ? 'step' : undefined}
    class={cn(
        className,
        'relative flex min-h-8 items-center gap-2.5 px-1 not-last:after:absolute not-last:after:start-3 not-last:after:top-[calc(50%+var(--spacing)*2.75)] not-last:after:h-[calc(100%-var(--spacing)*5)] not-last:after:w-[length:var(--border-size)] not-last:after:-translate-x-1/2 not-last:after:bg-border rtl:not-last:after:translate-x-1/2'
    )}
>
    {@render children?.()}
</li>
