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
        // token-lint-disable-next-line no-literal-length: display numerals tighten relative to their own size
        'font-mono text-[length:var(--font-size-display)] leading-none font-normal tracking-[-0.04em] tabular-nums text-[var(--folder-card-ink)]'
    )}
>
    {@render children()}
</span>
