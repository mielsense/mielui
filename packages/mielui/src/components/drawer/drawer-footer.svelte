<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { DrawerRegionProps } from '.';
    import { getDrawerContext } from './context';

    let {
        element = $bindable(null),
        children,
        class: className,
        ...rest
    }: DrawerRegionProps = $props();
    const drawer = getDrawerContext();

    $effect(() => {
        drawer.footer = footer;
        return () => {
            if (drawer.footer === footer) {
                drawer.footer = undefined;
            }
        };
    });
</script>

{#snippet footer()}
    <div
        {...rest}
        bind:this={element}
        data-ui="drawer-footer"
        class={cn(
            className,
            'flex w-full flex-row items-center gap-2 p-2 [&>[data-ui=drawer-close]]:me-auto'
        )}
    >
        {@render children?.()}
    </div>
{/snippet}
