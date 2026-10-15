<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { TaskStepsListProps } from '.';
    import { findTaskStepsLabels } from './context.svelte';

    let { children, class: className, ...rest }: TaskStepsListProps = $props();
    const labels = findTaskStepsLabels();
</script>
<ol
    {...rest}
    data-ui="task-steps-list"
    aria-label={rest['aria-label'] ?? labels?.()?.list ?? 'Task progress'}
    class={cn(className, 'm-0 list-none space-y-0.5 p-0')}
>
    {@render children?.()}
</ol>
