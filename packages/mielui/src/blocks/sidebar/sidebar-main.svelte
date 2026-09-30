<script lang="ts">
    import { cn } from '@mielui/svelte/utils';

    import type { SidebarMainProps } from './types';

    let { children, class: className, element = $bindable(), ...rest }: SidebarMainProps = $props();
</script>

<div
    {...rest}
    bind:this={element}
    data-ui="sidebar-main"
    class={cn(className, 'flex min-h-0 min-w-0 flex-1 flex-col')}
>
    {@render children?.()}
</div>
