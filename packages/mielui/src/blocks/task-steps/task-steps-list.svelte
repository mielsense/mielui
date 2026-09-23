<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { TaskStepsListProps } from '.';
    import { getTaskSteps } from './context.svelte';

    let { children, class: className, ...rest }: TaskStepsListProps = $props();
    const context = getTaskSteps();
</script>
<ol
    {...rest}
    data-ui="task-steps-list"
    aria-label={context.label}
    class={cn(className, "space-y-0.5")}
>
    {@render children?.()}
</ol>
