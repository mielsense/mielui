<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Toolbar as Primitive } from 'bits-ui';
    import { button } from '../../components/button/variants';
    import type { ToolbarButtonProps } from '.';

    let {
        element = $bindable(null),
        children,
        class: className,
        ...rest
    }: ToolbarButtonProps = $props();
</script>
<Primitive.Button {...rest} bind:ref={element}>
    {#snippet child({ props })}
        <button
            type="button"
            {...props}
            use:pressable
            data-ui="toolbar-button"
            class={cn(className, button({ variant: 'quiet', size: 'sm' }), 'data-[state=on]:bg-secondary data-[state=on]:text-foreground')}
        >
            {@render children?.()}
        </button>
    {/snippet}
</Primitive.Button>
