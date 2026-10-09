<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Toolbar as Primitive } from 'bits-ui';
    import { button } from '../../components/button/variants';
    import type { ToolbarLinkProps } from '.';
    import { getToolbarVariant } from './context';
    import { toolbarControlClass } from './styles';

    let {
        element = $bindable(null),
        children,
        class: className,
        ...rest
    }: ToolbarLinkProps = $props();
    const variant = getToolbarVariant();
    const on = $derived((rest as { 'data-state'?: unknown })['data-state'] === 'on');
    const controlClass = $derived(
        cn(
            className,
            toolbarControlClass(variant(), on),
            button({
                variant: 'quiet',
                size: 'sm'
            })
        )
    );
</script>
<Primitive.Link {...rest} bind:ref={element}>
    {#snippet child({ props })}
        <a {...props} use:pressable data-ui="toolbar-link" class={controlClass}>
            {@render children?.()}
        </a>
    {/snippet}
</Primitive.Link>
