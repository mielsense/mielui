<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { SvelteHTMLElements } from 'svelte/elements';

    let { children, class: className, ...rest }: SvelteHTMLElements['caption'] = $props();
</script>

<caption
    {...rest}
    data-ui="table-caption"
    class={cn(
        className,
        'caption-bottom px-3 pt-3 pb-1 [table[data-variant=inset]>&]:px-4 text-start text-[length:var(--font-size-label)] leading-normal text-foreground-muted'
    )}
>
    {@render children?.()}
</caption>
