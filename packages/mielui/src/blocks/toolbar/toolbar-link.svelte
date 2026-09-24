<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Toolbar as Primitive } from 'bits-ui';
    import { button } from '../../components/button/variants';
    import type { ToolbarLinkProps } from '.';
    import { getToolbarVariant } from './context';

    let {
        element = $bindable(null),
        children,
        class: className,
        ...rest
    }: ToolbarLinkProps = $props();
    const variant = getToolbarVariant();
</script>
<Primitive.Link {...rest} bind:ref={element}>
    {#snippet child({ props })}
        <a
            {...props}
            use:pressable
            data-ui="toolbar-link"
            class={cn(className, variant() === 'depth' ? 'bg-secondary text-foreground-muted shadow-[var(--mielui-toolbar-raised)] hover:text-foreground active:bg-background active:shadow-[var(--mielui-toolbar-pressed)] data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-[var(--mielui-toolbar-pressed)] focus-visible:shadow-[var(--focus-ring),var(--mielui-toolbar-raised)] data-[state=on]:focus-visible:shadow-[var(--focus-ring),var(--mielui-toolbar-pressed)]' : 'data-[state=on]:bg-secondary data-[state=on]:text-foreground', button({ variant: 'quiet', size: 'sm' }))}
        >
            {@render children?.()}
        </a>
    {/snippet}
</Primitive.Link>
