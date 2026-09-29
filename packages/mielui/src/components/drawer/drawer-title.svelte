<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Drawer as Primitive } from 'vaul-svelte';
    import { titleClasses } from '../typography/variants';
    import type { DrawerTitleProps } from '.';

    let {
        element = $bindable(null),
        children,
        class: className,
        ...rest
    }: DrawerTitleProps = $props();
</script>
<Primitive.Title
    {...rest}
    bind:ref={element}
    data-ui="drawer-title"
    class={cn(className, titleClasses)}
>
    {@render children?.()}
</Primitive.Title>
