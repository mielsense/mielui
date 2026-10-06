<script lang="ts">
    import type { Snippet } from 'svelte';

    let {
        label,
        wide = false,
        children
    }: {
        label: string;
        wide?: boolean;
        children: Snippet;
    } = $props();
</script>

<div class="flex min-h-11 items-center justify-between gap-3">
    <span class="min-w-0 truncate text-sm text-foreground-muted">{label}</span>
    <div
        class={wide
            ? 'w-44 min-w-0 shrink-0'
            : 'flex min-w-0 shrink-0 items-center justify-end [&>div]:min-h-0 [&>div]:items-center'}
    >
        {@render children()}
    </div>
</div>
