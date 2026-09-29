<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { ComposerHeaderProps } from '.';
    import { getComposerContext } from './context.svelte';

    let { children, class: className, ...rest }: ComposerHeaderProps = $props();
    const context = getComposerContext();
</script>

<div
    {...rest}
    data-ui="composer-header"
    data-state={context.status}
    class={cn(
        className,
        'flex min-w-0 items-center gap-1.5 overflow-x-auto overscroll-x-contain p-1 [scrollbar-width:none] [&:not(:has(*))]:hidden [&::-webkit-scrollbar]:hidden'
    )}
>
    {@render children?.()}
</div>
