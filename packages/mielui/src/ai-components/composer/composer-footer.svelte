<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { ComposerFooterProps } from '.';
    import { getComposerContext } from './context.svelte';

    let { children, class: className, ...rest }: ComposerFooterProps = $props();
    const context = getComposerContext();
</script>

<div
    {...rest}
    data-ui="composer-footer"
    data-state={context.status}
    class={cn(
        className,
        'flex min-h-9 min-w-0 flex-wrap items-center gap-2 px-2 py-1.5 [--size-control-md:var(--size-control-sm)] [--size-icon-md:calc(var(--size-control-sm)-var(--size-hairline))] [font-size:var(--font-size-label)] leading-label text-foreground-muted [&:not(:has(*))]:hidden'
    )}
>
    {@render children?.()}
</div>
