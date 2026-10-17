<script lang="ts">
    import { pressable } from '@mielui/svelte/utils';
    import { Toolbar as Primitive } from 'bits-ui';
    import type { ToolbarItemProps } from '.';
    import { getToolbarVariant } from './context';
    import { toolbarActionClass } from './styles';

    let {
        element = $bindable(null),
        children,
        class: className,
        ...rest
    }: ToolbarItemProps = $props();
    const variant = getToolbarVariant();
</script>
<Primitive.GroupItem {...rest} bind:ref={element}>
    {#snippet child({ props, pressed })}
        <button
            type="button"
            {...props}
            use:pressable
            data-ui="toolbar-item"
            class={toolbarActionClass(className, variant(), pressed)}
        >
            {@render children?.({ pressed })}
        </button>
    {/snippet}
</Primitive.GroupItem>
