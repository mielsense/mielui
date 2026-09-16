<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { Snippet } from 'svelte';
    import { getCommandContext } from './context.svelte';

    const { state: command } = getCommandContext();

    type Props = {
        children?: Snippet;
        class?: string;
    };

    let { children, class: className, ...rest }: Props = $props();
</script>

{#if command.searchContent === ''}
    <div
        {...rest}
        data-ui="menu-separator"
        class={cn(
            className,
            'mielui-menu-separator mx-6'
        )}
    >
        {@render children?.()}
    </div>
{/if}
