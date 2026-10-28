<script lang="ts">
    import type { Snippet } from 'svelte';
    import { lookFor } from '#lib/components/shell/look.js';
    import Sticker from '#lib/components/shell/sticker.svelte';
    import { page } from '$app/state';

    let { title, children }: { title: string; children?: Snippet } = $props();

    const look = $derived(lookFor(page.url.pathname));
    const onGroupPage = $derived(page.url.pathname === look.href);
</script>

<header
    data-docs-intro
    style:--tint={look.tint}
    class="group/section relative isolate flex flex-col gap-3 pt-2"
>
    <div
        aria-hidden="true"
        class="mesh-glow pointer-events-none absolute -inset-x-4 -top-8 -bottom-6 -z-10 sm:-inset-x-8"
    ></div>
    {#if onGroupPage}
        <p class="m-0 flex items-center gap-2 text-[13px] font-medium text-foreground">
            <Sticker icon={look.icon} mesh={look.mesh} />
            {look.title}
        </p>
    {:else}
        <a
            href={look.href}
            class="flex items-center gap-2 self-start rounded-[var(--radius-control)] text-[13px] font-medium text-foreground focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none"
        >
            <Sticker icon={look.icon} mesh={look.mesh} />
            {look.title}
        </a>
    {/if}
    <h1 class="display m-0 text-[2.5rem] [font-family:var(--font-header)]">
        {title}
    </h1>
    {#if children}
        <div class="text-lg leading-normal text-foreground-muted">
            {@render children()}
        </div>
    {/if}
</header>
