<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Toolbar as Primitive } from 'bits-ui';
    import type { ToolbarRootProps } from '.';
    import { setToolbarOrientation } from './context';

    let {
        element = $bindable(null),
        orientation = 'horizontal',
        children,
        class: className,
        ...rest
    }: ToolbarRootProps = $props();
    setToolbarOrientation(() => orientation);
</script>
<Primitive.Root
    {...rest}
    bind:ref={element}
    {orientation}
    data-ui="toolbar"
    class={cn(className, 'flex items-center gap-2 rounded-[calc(var(--radius-lg)+var(--spacing)*2)] border-[length:var(--border-size)] border-border bg-card p-2 text-foreground shadow-[var(--elevation-float)]', orientation === 'vertical' && 'flex-col')}
>
    {@render children?.()}
</Primitive.Root>
