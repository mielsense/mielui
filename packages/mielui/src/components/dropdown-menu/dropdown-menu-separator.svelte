<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { DropdownMenu as MenuPrimitive } from 'bits-ui';
    import type { Snippet } from 'svelte';

    type Props = {
        children?: Snippet;
        class?: string;
    };

    let { children, class: className, ...rest }: Props = $props();
</script>

<MenuPrimitive.Separator
    {...rest}
    data-ui="menu-separator"
    class={cn(className, 'mielui-menu-separator')}
>
    {@render children?.()}
</MenuPrimitive.Separator>
