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
            class={cn(className, 'border-[length:var(--border-size)] border-border bg-secondary text-foreground-muted shadow-[var(--elevation-button-outline)] hover:text-foreground active:bg-background active:shadow-[var(--elevation-control)] data-[state=on]:border-border-strong data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-[var(--elevation-control)] focus-visible:shadow-[var(--focus-ring),var(--elevation-button-outline)] data-[state=on]:focus-visible:shadow-[var(--focus-ring),var(--elevation-control)]', button({ variant: 'quiet', size: 'sm' }))}
        >
            {@render children?.()}
        </button>
    {/snippet}
</Primitive.Button>
