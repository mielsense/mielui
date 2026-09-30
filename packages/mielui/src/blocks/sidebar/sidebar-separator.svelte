<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { SidebarSeparatorProps } from './types';

    let { class: className, ...rest }: SidebarSeparatorProps = $props();
</script>

<hr
    {...rest}
    data-ui="sidebar-separator"
    class={cn(className, 'm-0 shrink-0 border-0 border-t-[length:var(--border-size)] border-border')}
/>
