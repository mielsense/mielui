<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';
    import { getToastContext } from './context.svelte';
    import Action from './toast-action.svelte';

    let { children, class: className, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
    const context = getToastContext();
</script>

{#if children || context.toast.actions?.length}
    <div
        {...rest}
        data-ui="toast-actions"
        class={cn(className, 'ml-auto flex flex-wrap items-center gap-2')}
    >
        {#if children}
            {@render children()}
        {:else}
            {#each context.toast.actions ?? [] as action, index (index)}
                <Action {action} />
            {/each}
        {/if}
    </div>
{/if}
