<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getSidebarRoot } from './context.svelte';
    import type { SidebarMainProps } from './types';

    let { children, class: className, element = $bindable(), ...rest }: SidebarMainProps = $props();
    const root = getSidebarRoot();
</script>

<div
    {...rest}
    bind:this={element}
    data-ui="sidebar-main"
    data-variant={root.inset ? 'inset' : 'default'}
    class={cn(className, 'flex min-h-0 min-w-0 flex-1 flex-col', root.inset ? 'mielui-inset-frame m-2 overflow-hidden' : undefined)}
>
    <div
        data-ui="sidebar-main-surface"
        class={root.inset ? 'mielui-inset-surface flex min-h-0 min-w-0 flex-1 flex-col gap-[inherit] overflow-hidden' : 'contents'}
    >
        {@render children?.()}
    </div>
</div>
