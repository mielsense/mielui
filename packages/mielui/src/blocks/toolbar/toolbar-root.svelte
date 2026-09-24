<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Toolbar as Primitive } from 'bits-ui';
    import type { ToolbarRootProps } from '.';
    import { setToolbarOrientation, setToolbarVariant } from './context';

    let {
        element = $bindable(null),
        orientation = 'horizontal',
        variant = 'default',
        children,
        class: className,
        ...rest
    }: ToolbarRootProps = $props();
    setToolbarOrientation(() => orientation);
    setToolbarVariant(() => variant);
</script>
<Primitive.Root
    {...rest}
    bind:ref={element}
    {orientation}
    data-ui="toolbar"
    data-variant={variant}
    class={cn(className, variant === 'depth' ? 'flex items-center gap-2 rounded-[calc(var(--radius-lg)+var(--spacing))] border-[length:var(--border-size)] border-border bg-card p-1 text-foreground shadow-[var(--elevation-float)]' : 'flex items-center gap-1 rounded-[var(--radius-lg)] p-1.5 text-foreground', orientation === 'vertical' && 'flex-col')}
>
    {@render children?.()}
</Primitive.Root>
