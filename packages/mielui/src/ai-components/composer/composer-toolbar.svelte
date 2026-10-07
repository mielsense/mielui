<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { toolbarNavigation } from '../../blocks/toolbar/navigation';
    import type { ComposerToolbarProps } from '.';
    import { getComposerContext } from './context.svelte';

    let {
        children,
        class: className,
        variant = 'default',
        'aria-label': ariaLabel = 'Message actions',
        ...rest
    }: ComposerToolbarProps = $props();

    const context = getComposerContext();
    const joined = $derived(variant !== 'inset');

    $effect(() => {
        if (joined) {
            context.setInsetToolbar(true);
            return () => {
                context.setInsetToolbar(false);
            };
        }
    });
</script>

<div
    use:toolbarNavigation
    {...rest}
    data-ui="composer-toolbar"
    data-variant={variant}
    data-state={context.status}
    role="toolbar"
    aria-label={ariaLabel}
    class={cn(
        className,
        'flex min-w-0 flex-wrap items-center justify-between gap-2 [--size-control-md:var(--size-control-sm)] [--size-icon-md:calc(var(--size-control-sm)-var(--size-hairline))] [&_[data-variant=outline]]:rounded-full [&_[data-variant=outline]]:border-border [&_[data-variant=outline]]:shadow-none [&_[data-variant=outline]:not(:hover,[data-state=open])]:bg-transparent [&_[data-variant=outline]]:focus-visible:shadow-[var(--focus-ring)]',
        joined
            ? 'mielui-inset-surface -mt-[calc(var(--mielui-modal-inset)+var(--composer-toolbar-overlap))] min-h-9 rounded-t-none px-2 pt-[calc(var(--spacing)*1.5+var(--composer-toolbar-overlap))] pb-1.5 [--composer-toolbar-overlap:1px]'
            : 'min-h-9 p-1'
    )}
>
    {@render children?.()}
</div>
