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
    class={cn(className, 'm-0 list-none space-y-0.5 p-0')}
>
    {@render children?.()}
</ol>
