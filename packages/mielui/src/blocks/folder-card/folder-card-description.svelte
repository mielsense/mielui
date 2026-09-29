<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FolderCardDescriptionProps } from '.';

    let { class: className, children, ...rest }: FolderCardDescriptionProps = $props();
</script>

<p
    data-ui="folder-card-description"
    {...rest}
    class={cn(
        className,
        'text-[length:var(--font-size-label)] leading-[var(--leading-label)] text-pretty break-words text-[var(--folder-card-ink-muted)]'
    )}
>
    {@render children()}
</p>
