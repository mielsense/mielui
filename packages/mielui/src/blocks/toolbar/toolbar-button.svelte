<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Toolbar as Primitive } from 'bits-ui';
    import { button } from '../../components/button/variants';
    import type { ToolbarButtonProps } from '.';
    import { getToolbarVariant } from './context';

    let {
        element = $bindable(null),
        children,
        class: className,
        ...rest
    }: ToolbarButtonProps = $props();
    const variant = getToolbarVariant();
</script>
<Primitive.Button {...rest} bind:ref={element}>
    {#snippet child({ props })}
        <button
            type="button"
            {...props}
            use:pressable
            data-ui="toolbar-button"
            class={cn(className, variant() === 'depth' ? 'bg-secondary text-foreground-muted shadow-[var(--mielui-toolbar-raised)] hover:text-foreground active:bg-background active:shadow-[var(--mielui-toolbar-pressed)] data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-[var(--mielui-toolbar-pressed)] focus-visible:shadow-[var(--focus-ring),var(--mielui-toolbar-raised)] data-[state=on]:focus-visible:shadow-[var(--focus-ring),var(--mielui-toolbar-pressed)]' : 'data-[state=on]:bg-secondary data-[state=on]:text-foreground', button({ variant: 'quiet', size: 'sm' }))}
        >
            {@render children?.()}
        </button>
    {/snippet}
</Primitive.Button>
