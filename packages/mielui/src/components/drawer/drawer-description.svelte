<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Drawer as Primitive } from 'vaul-svelte';
    import { descriptionClasses } from '../typography/variants';
    import type { DrawerDescriptionProps } from '.';

    let {
        element = $bindable(null),
        children,
        class: className,
        ...rest
    }: DrawerDescriptionProps = $props();
</script>
<Primitive.Description
    {...rest}
    bind:ref={element}
    data-ui="drawer-description"
    class={cn(className, descriptionClasses)}
>
    {@render children?.()}
</Primitive.Description>
