<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Toolbar as Primitive } from 'bits-ui';
    import { button } from '../../components/button/variants';
    import type { ToolbarButtonProps } from '.';
    import { getToolbarVariant } from './context';
    import { toolbarControlClass } from './styles';

    let {
        element = $bindable(null),
        children,
        class: className,
        ...rest
    }: ToolbarButtonProps = $props();
    const variant = getToolbarVariant();
    const controlClass = $derived(
        cn(className, toolbarControlClass(variant()), button({ variant: 'quiet', size: 'sm' }))
    );
</script>
<Primitive.Button {...rest} bind:ref={element}>
    {#snippet child({ props })}
        <button
            type="button"
            {...props}
            use:pressable
            data-ui="toolbar-button"
            class={controlClass}
        >
            {@render children?.()}
        </button>
    {/snippet}
</Primitive.Button>
