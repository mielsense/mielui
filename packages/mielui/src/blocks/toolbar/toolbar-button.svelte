<script lang="ts">
    import { pressable } from '@mielui/svelte/utils';
    import { Toolbar as Primitive } from 'bits-ui';
    import type { ToolbarButtonProps } from '.';
    import { getToolbarVariant } from './context';
    import { toolbarActionClass } from './styles';

    let {
        element = $bindable(null),
        children,
        class: className,
        ...rest
    }: ToolbarButtonProps = $props();
    const variant = getToolbarVariant();
    const on = $derived((rest as { 'data-state'?: unknown })['data-state'] === 'on');
    const controlClass = $derived(toolbarActionClass(className, variant(), on));
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
