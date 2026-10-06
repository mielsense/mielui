<script lang="ts">
    import type { Snippet } from 'svelte';

    let {
        title,
        action,
        children
    }: {
        title: string;
        action?: Snippet;
        children: Snippet;
    } = $props();
</script>

<section class="flex flex-col gap-1.5">
    <div class="flex h-[var(--size-control-sm)] items-center justify-between gap-2 ps-3 pe-1">
        <h2 class="m-0 text-sm font-medium text-foreground">{title}</h2>
        {@render action?.()}
    </div>
    <div class="flex flex-col rounded-[var(--radius-xl)] bg-[var(--docs-soft)] px-3 py-1.5">
        {@render children()}
    </div>
</section>
