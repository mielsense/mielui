<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FolderCardTabProps } from '.';

    let { class: className, children, ...rest }: FolderCardTabProps = $props();

    const shapeClasses = [
        'relative z-1 col-start-1 row-start-2 w-fit min-w-0 justify-self-start',
        'max-w-[calc(100%-var(--folder-card-radius)*2)] min-h-[calc(var(--folder-card-radius)*2)]',
        'rounded-t-[var(--folder-card-radius)] bg-[var(--folder-card-body)]',
        'after:absolute after:bottom-0 after:left-full after:size-[var(--folder-card-radius)]',
        'after:bg-[radial-gradient(circle_farthest-side_at_100%_0,transparent_96%,var(--folder-card-body))]'
    ];
</script>

<div
    data-ui="folder-card-tab"
    {...rest}
    class={cn(className, shapeClasses, 'flex flex-col gap-0.5 pt-3 pr-4 pb-2 pl-5')}
>
    {@render children()}
</div>
