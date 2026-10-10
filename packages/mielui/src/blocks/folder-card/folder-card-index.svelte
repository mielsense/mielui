<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FolderCardIndexProps } from '.';

    let { class: className, children, ...rest }: FolderCardIndexProps = $props();
</script>

<span
    data-ui="folder-card-index"
    {...rest}
    class={cn(
        className,
        'font-mono text-[length:var(--font-size-display)] leading-none font-normal tracking-[-0.04em] tabular-nums text-[var(--folder-card-ink)]'
    )}
>
    {@render children()}
</span>
