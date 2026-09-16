<script lang="ts">
    import type { Snippet } from 'svelte';
    import CopyPage from '$lib/components/docs/copy-page.svelte';
    import OnThisPage from '$lib/components/docs/on-this-page.svelte';

    const { children }: { children: Snippet } = $props();
    let content = $state<HTMLDivElement>();
</script>

<div
    class="mx-auto grid min-h-[calc(100svh-6.5rem)] w-full grid-cols-[minmax(0,1fr)] gap-10 px-3 pt-8 sm:px-8 lg:px-10 lg:pt-10 xl:grid-cols-[minmax(0,1fr)_13rem] xl:gap-16 xl:pr-14 2xl:gap-20 2xl:pr-16"
>
    <div bind:this={content} class="mx-auto w-full min-w-0 max-w-[960px]">
        <div class="mb-5 flex justify-end"><CopyPage /></div>
        {@render children?.()}
        <div class="h-32 shrink-0" aria-hidden="true"></div>
    </div>
    <aside class="hidden min-w-0 xl:block"><OnThisPage {content} /></aside>
</div>
