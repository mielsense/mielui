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
    aria-current={status === "active" ? "step" : undefined}
    class={cn(className, "flex min-h-7 items-center gap-2.5 px-1")}
>
    {@render children?.()}
</li>
