<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';

    const notFound = $derived(page.status === 404);

    function retry() {
        window.location.reload();
    }
</script>

<svelte:head>
    <title>{page.status} · mielui</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<section
    class="flex h-full min-h-0 w-full items-center justify-center overflow-y-auto overscroll-contain px-6 py-10 text-foreground"
>
    <div class="flex w-full max-w-md flex-col gap-4">
        <span class="font-mono text-xs tabular-nums text-foreground-muted">{page.status}</span>
        <h1 class="m-0 text-xl leading-tight [font-weight:var(--font-weight-header)]">
            {notFound ? 'Page not found' : 'This page could not load'}
        </h1>
        <p class="m-0 text-sm leading-body text-foreground-muted">
            {notFound
                ? 'Check the address or browse the documentation to find what you need.'
                : 'Try loading the page again, or return to the documentation.'}
        </p>
        <div class="mt-2 flex flex-wrap items-center gap-2">
            {#if !notFound}
                <Button onclick={retry}>Try again</Button>
            {/if}
            <Button href={resolve('/docs/introduction')} variant={notFound ? 'primary' : 'outline'}>
                Documentation
            </Button>
            <Button href={resolve('/')} variant="ghost">Home</Button>
        </div>
    </div>
</section>
