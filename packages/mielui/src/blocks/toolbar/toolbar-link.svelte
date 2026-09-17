<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Toolbar as Primitive } from 'bits-ui';
    import { button } from '../../components/button/variants';
    import type { ToolbarLinkProps } from '.';

    let {
        element = $bindable(null),
        children,
        class: className,
        ...rest
    }: ToolbarLinkProps = $props();
</script>
<Primitive.Link {...rest} bind:ref={element}>
    {#snippet child({ props })}
        <a
            {...props}
            use:pressable
            data-ui="toolbar-link"
            class={cn(className, button({ variant: 'quiet', size: 'sm' }), 'data-[state=on]:bg-secondary data-[state=on]:text-foreground')}
        >
            {@render children?.()}
        </a>
    {/snippet}
</Primitive.Link>
