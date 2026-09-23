<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';

    const isDocs = $derived(page.url.pathname.startsWith('/docs'));
    const notFound = $derived(page.status === 404);

    function retry() {
        window.location.reload();
    }
</script>

<svelte:head>
    <title>{page.status} · mielui</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<div class={`grid h-full min-h-0 ${isDocs ? 'xl:grid-cols-[minmax(0,1fr)_18rem]' : ''}`}>
    <section class="flex min-h-0 min-w-0 flex-col bg-[var(--docs-content)]">
        <header
            class="flex items-center justify-between gap-4 border-b border-[var(--docs-rule)] bg-[var(--docs-chrome)] px-5 py-4 sm:px-6 lg:px-8"
        >
            <h1 class="m-0 text-sm leading-5 font-medium">
                {notFound ? 'Page not found' : 'Page unavailable'}
            </h1>
            <span class="font-mono text-xs tabular-nums text-foreground-muted">{page.status}</span>
        </header>
        <div
            class="flex min-h-0 flex-1 items-center justify-center overflow-y-auto overscroll-none p-8"
        >
            <div class="flex w-full max-w-md flex-col gap-4">
                <h2 class="m-0 text-lg font-medium text-foreground">
                    {notFound ? 'This address does not lead to a page.' : 'This page could not load.'}
                </h2>
                <p class="m-0 text-sm leading-6 text-foreground-muted">
                    {notFound ? 'Check the address or use the documentation to find what you need.' : 'Try loading it again. You can also open the documentation or return home.'}
                </p>
                <div class="mt-2 flex flex-wrap items-center gap-2">
                    {#if !notFound}
                        <Button onclick={retry}>Try again</Button>
                    {/if}
                    <Button
                        href={resolve('/docs/introduction')}
                        variant={notFound ? 'primary' : 'outline'}
                    >
                        Documentation
                    </Button>
                    <Button href={resolve('/')} variant="ghost">Home</Button>
                </div>
            </div>
        </div>
    </section>
    {#if isDocs}
        <div
            aria-hidden="true"
            class="hidden border-l border-[var(--docs-rule)] bg-[var(--docs-chrome)] xl:block"
        ></div>
    {/if}
</div>
