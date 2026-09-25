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
    const controlClass = $derived(
        cn(className, toolbarControlClass(variant()), button({ variant: 'quiet', size: 'sm' }))
    );
</script>
<Primitive.GroupItem {...rest} bind:ref={element}>
    {#snippet child({ props, pressed })}
        <button type="button" {...props} use:pressable data-ui="toolbar-item" class={controlClass}>
            {@render children?.({ pressed })}
        </button>
    {/snippet}
</Primitive.GroupItem>
