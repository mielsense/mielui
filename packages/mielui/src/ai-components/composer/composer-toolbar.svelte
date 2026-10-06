<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { toolbarNavigation } from '../../blocks/toolbar/navigation';
    import type { ComposerToolbarProps } from '.';
    import { getComposerContext } from './context.svelte';

    let {
        children,
        class: className,
        variant = 'chrome',
        'aria-label': ariaLabel = 'Message actions',
        ...rest
    }: ComposerToolbarProps = $props();

    const context = getComposerContext();
    const inset = $derived(variant === 'inset');

    $effect(() => {
        if (inset) {
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
        inset
            ? 'mielui-inset-surface -mt-[var(--mielui-modal-inset)] min-h-9 rounded-t-none px-2 py-1.5'
            : 'min-h-9 p-1'
    )}
>
    {@render children?.()}
</div>
