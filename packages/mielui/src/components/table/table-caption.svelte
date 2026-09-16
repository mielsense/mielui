<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    let { children, class: className, ...rest }: HTMLAttributes<HTMLTableCaptionElement> = $props();
</script>

<caption
    {...rest}
    data-ui="table-caption"
    class={cn(className, 'caption-bottom pt-3 text-start text-sm leading-6 text-foreground-muted')}
>
    {@render children?.()}
</caption>
