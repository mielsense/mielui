<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FolderCardFooterProps } from '.';

    let { class: className, children, ...rest }: FolderCardFooterProps = $props();
</script>

<footer
    data-ui="folder-card-footer"
    {...rest}
    class={cn(
        className,
        'relative z-1 col-start-1 row-start-3 flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1 self-end px-5 pt-3 pb-4'
    )}
>
    {@render children()}
</footer>
