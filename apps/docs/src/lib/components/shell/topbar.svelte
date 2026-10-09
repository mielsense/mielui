<script lang="ts">
    import type { Snippet } from 'svelte';
    import ThemeToggle from './theme-toggle.svelte';

    const {
        leading,
        children,
        actions
    }: {
        leading?: Snippet;
        children?: Snippet;
        actions?: Snippet;
    } = $props();
</script>

<header class="flex h-[50px] w-full min-w-0 shrink-0 items-center gap-1.5 px-2.5">
    {@render leading?.()}
    <div class="flex min-w-0 flex-1 items-center gap-1.5">
        {@render children?.()}
    </div>
    <div class="flex shrink-0 items-center gap-1.5">
        {@render actions?.()}
        <ThemeToggle />
    </div>
</header>
