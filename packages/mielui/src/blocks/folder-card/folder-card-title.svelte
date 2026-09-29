<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FolderCardTitleProps } from '.';

    let { level = 3, class: className, children, ...rest }: FolderCardTitleProps = $props();

    const tag = $derived(`h${level}` as const);
</script>

<svelte:element
    this={tag}
    data-ui="folder-card-title"
    {...rest}
    class={cn(
        className,
        'font-[family-name:var(--font-header)] text-[length:var(--font-size-header)] [font-weight:var(--font-weight-label)] leading-snug text-pretty break-words text-[var(--folder-card-ink)]'
    )}
>
    {@render children()}
</svelte:element>
