<script lang="ts">
    import type { TaskStepsSummaryProps } from '.';
    import { getTaskStepsContext } from './context';

    let { children, ...rest }: TaskStepsSummaryProps = $props();
    const context = getTaskStepsContext();
    let spoken = $state('');
    $effect(() => {
        const sentence = context.state.sentence;
        const timer = setTimeout(() => {
            spoken = sentence;
        }, 500);
        return () => clearTimeout(timer);
    });
</script>
<span {...rest} data-ui="task-steps-summary" role="status" aria-live="polite">
    {#if children}
        {@render children(context.state)}
    {:else}
        {spoken}
    {/if}
</span>
