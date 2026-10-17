<script lang="ts">
    import { pressable } from '@mielui/svelte/utils';
    import { Toolbar as Primitive } from 'bits-ui';
    import type { ToolbarLinkProps } from '.';
    import { getToolbarVariant } from './context';
    import { toolbarActionClass } from './styles';

    let {
        element = $bindable(null),
        children,
        class: className,
        ...rest
    }: ToolbarLinkProps = $props();
    const variant = getToolbarVariant();
    const on = $derived((rest as { 'data-state'?: unknown })['data-state'] === 'on');
    const controlClass = $derived(toolbarActionClass(className, variant(), on));
</script>
<Primitive.Link {...rest} bind:ref={element}>
    {#snippet child({ props })}
        <a {...props} use:pressable data-ui="toolbar-link" class={controlClass}>
            {@render children?.()}
        </a>
    {/snippet}
</Primitive.Link>
