<script lang="ts">
    import type { Snippet } from 'svelte';
    import { page } from '$app/state';
    import BreadcrumbNav from './breadcrumb-nav.svelte';
    import { getBreadcrumbs } from './breadcrumbs';

    let { title, children }: { title: string; children?: Snippet } = $props();

    const trail = $derived(getBreadcrumbs(page.url.pathname).slice(1));
</script>

<header data-docs-intro class="flex flex-col gap-3">
    {#if trail.length > 1}
        <BreadcrumbNav items={trail} />
    {/if}
    <h1
        class="m-0 text-[2rem] leading-10 font-semibold tracking-[-0.025em] text-foreground [font-family:var(--font-header)]"
    >
        {title}
    </h1>
    {#if children}
        <div class="max-w-[64ch] text-base leading-7 text-foreground-muted">
            {@render children()}
        </div>
    {/if}
</header>
