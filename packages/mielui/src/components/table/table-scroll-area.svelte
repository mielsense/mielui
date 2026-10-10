<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    let { children, class: className, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
    {...rest}
    data-ui="table-scroll-area"
    class={cn(
        className,
        'w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain rounded-[var(--radius-md)] [--table-frame-radius:calc(min(var(--radius-2xl),var(--radius-control)+var(--spacing)*2+var(--border-size))*var(--mielui-squircle,1))] has-[>[data-variant=inset]]:rounded-t-[var(--table-frame-radius)] has-[>[data-variant=inset]:not(:has(>caption))]:rounded-b-[var(--table-frame-radius)] has-[>[data-variant=inset]]:[corner-shape:squircle] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]'
    )}
>
    {@render children?.()}
</div>
