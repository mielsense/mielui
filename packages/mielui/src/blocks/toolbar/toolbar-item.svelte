<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Toolbar as Primitive } from 'bits-ui';
    import { button } from '../../components/button/variants';
    import type { ToolbarItemProps } from '.';
    import { getToolbarVariant } from './context';
    import { toolbarControlClass } from './styles';

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
            class={cn(
                className,
                toolbarControlClass(variant(), pressed),
                button({
                    variant: 'quiet',
                    size: 'sm'
                })
            )}
        >
            {@render children?.({ pressed })}
        </button>
    {/snippet}
</Primitive.GroupItem>
