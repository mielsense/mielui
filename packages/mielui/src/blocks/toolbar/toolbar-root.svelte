<script lang="ts">
    import { cn, travelingHighlight } from '@mielui/svelte/utils';
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

    const shell =
        'flex items-center gap-1 rounded-[min(calc(var(--radius-control)+var(--spacing)),calc(var(--size-control-sm)/2+var(--spacing)))] p-1 text-foreground';
    const flat =
        'mielui-collection-surface bg-secondary [&>.mielui-item-highlight]:rounded-[var(--radius-control)]';
    const depth =
        'gap-2 border-[length:var(--border-size)] border-border bg-card shadow-[var(--elevation-float)]';

    $effect(() => {
        if (!element || variant === 'depth') {
            return;
        }
        const highlight = travelingHighlight(element, {
            itemSelector:
                '[data-ui=toolbar-item], [data-ui=toolbar-button], [data-ui=toolbar-link]',
            restingSelector: '[data-toolbar-highlight-rest]'
        });

        return () => {
            highlight.destroy?.();
        };
    });
</script>
<Primitive.Root
    {...rest}
    bind:ref={element}
    {orientation}
    data-ui="toolbar"
    data-variant={variant}
    class={cn(
        className,
        variant === 'depth' ? depth : flat,
        orientation === 'vertical' && 'flex-col items-stretch',
        shell
    )}
>
    {@render children?.()}
</Primitive.Root>
