<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { untrack } from 'svelte';
    import type { FolderCardTitleProps } from '.';
    import { getFolderCardContext } from './context';

    let { level = 3, class: className, children, ...rest }: FolderCardTitleProps = $props();

    const tag = $derived(`h${level}` as const);
    const folderCard = getFolderCardContext();

    function adoptId() {
        if (typeof rest.id === 'string') {
            folderCard.titleId = rest.id;
        }
    }

    untrack(adoptId);
    $effect.pre(adoptId);
</script>

<svelte:element
    this={tag}
    data-ui="folder-card-title"
    {...rest}
    id={folderCard.titleId}
    class={cn(
        className,
        'font-[family-name:var(--font-header)] text-[length:var(--font-size-header)] [font-weight:var(--font-weight-label)] leading-snug text-pretty break-words text-[var(--folder-card-ink)]'
    )}
>
    {@render children()}
</svelte:element>
