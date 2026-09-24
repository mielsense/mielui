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
            class={cn(className, 'bg-secondary text-foreground-muted shadow-[var(--elevation-button-outline)] hover:text-foreground active:bg-background active:shadow-[var(--elevation-control)] data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-[var(--elevation-control)] focus-visible:shadow-[var(--focus-ring),var(--elevation-button-outline)] data-[state=on]:focus-visible:shadow-[var(--focus-ring),var(--elevation-control)]', button({ variant: 'quiet', size: 'sm' }))}
        >
            {@render children?.()}
        </a>
    {/snippet}
</Primitive.Link>
