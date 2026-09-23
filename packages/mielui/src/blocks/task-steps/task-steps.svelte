<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { TaskStepsProps } from '.';
    import { setTaskSteps } from './context.svelte';
    import { deriveTaskSteps } from './state';
    import Indicator from './task-steps-indicator.svelte';
    import Item from './task-steps-item.svelte';
    import Label from './task-steps-label.svelte';
    import List from './task-steps-list.svelte';
    import Meta from './task-steps-meta.svelte';
    import Summary from './task-steps-summary.svelte';

    let {
        steps,
        current,
        failed = false,
        label = 'Task progress',
        children,
        class: className,
        ...rest
    }: TaskStepsProps = $props();
    const state = $derived(deriveTaskSteps(steps, current, failed));
    setTaskSteps({
        get state() {
            return state;
        },
        get label() {
            return label;
        }
    });
</script>
<div {...rest} data-ui="task-steps" class={cn(className, 'w-full')}>
    {#if children}
        {@render children(state)}
    {:else}
        <List>
            {#each state.rows as row (row.id)}
                <Item status={row.status}>
                    <Indicator />
                    <Label>{row.label}</Label>
                    {#if row.meta}
                        <Meta>{row.meta}</Meta>
                    {/if}
                </Item>
            {/each}
        </List>
        <Summary class="sr-only" />
    {/if}
</div>
