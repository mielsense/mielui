<script lang="ts">
    import { InformationCircleIcon as Info } from '@hugeicons/core-free-icons';
    import * as HoverCard from '@mielui/svelte/components/hover-card';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import CopyPage from '$lib/components/docs/copy-page.svelte';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import { getPageInfoContext } from '$lib/components/docs/page-info-context';
    import { getStudioContext } from '$lib/studio-context';

    const { isDocs = false }: { isDocs?: boolean } = $props();
    const pageInfo = getPageInfoContext();
    const studio = getStudioContext();
</script>

<footer
    class={`relative z-40 flex h-[var(--docs-row-height)] shrink-0 items-center justify-between gap-3 bg-[var(--docs-content)] text-xs text-foreground-muted before:pointer-events-none before:absolute before:inset-x-0 before:bottom-full before:h-4 before:bg-linear-to-t before:from-[var(--docs-content)] before:to-transparent ${isDocs ? 'px-[var(--docs-icon-inset)] md:grid md:grid-cols-[minmax(0,1fr)_16rem] md:gap-0 md:pe-0' : 'px-4 sm:px-5 min-[68.75rem]:flex min-[68.75rem]:gap-6'}`}
>
    {#if isDocs}
        <div
            class="flex min-w-0 flex-1 items-center justify-between gap-3 md:pe-[var(--docs-gutter)]"
        >
            <DocsPager />
            <CopyPage />
        </div>
        <div class="flex min-w-0 shrink-0 items-center gap-1 md:px-5">
            {#if pageInfo?.current}
                <HoverCard.Root>
                    <HoverCard.Trigger
                        class="size-[var(--size-icon-md)] shrink-0 items-center justify-center rounded-[var(--radius-lg)] text-foreground-muted transition-colors [transition-duration:var(--motion-duration-press)] hover:bg-foreground/[0.08] hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] md:-ms-[calc((var(--size-icon-md)-16px)/2)]"
                    >
                        <HugeiconsIcon icon={Info} size={16} />
                        <span class="sr-only">{`About ${pageInfo?.current.title}`}</span>
                    </HoverCard.Trigger>
                    <HoverCard.Content
                        side="top"
                        align="start"
                        class="w-80 max-w-[calc(100vw-2rem)]"
                    >
                        <HoverCard.Title>{pageInfo?.current.title}</HoverCard.Title>
                        {#if pageInfo?.current.description}
                            <div class="mt-2 text-sm leading-6 text-foreground-muted">
                                {@render pageInfo?.current.description()}
                            </div>
                        {/if}
                    </HoverCard.Content>
                </HoverCard.Root>
                <span class="hidden truncate text-sm md:inline">{pageInfo?.current.title}</span>
            {/if}
        </div>
    {:else}
        <span class="hidden shrink-0 sm:inline min-[68.75rem]:px-5">Mielui · Theme Studio</span>
        <div
            class="flex min-w-0 flex-1 items-center justify-between gap-4 min-[68.75rem]:pl-3 min-[68.75rem]:pr-5"
        >
            <div class="flex items-center gap-4 whitespace-nowrap">
                <Tabs.Root bind:value={studio.width} variant="ghost" class="hidden md:block">
                    <div role="group" aria-label="Preview width">
                        <Tabs.List>
                            <Tabs.Trigger value="wide">Wide</Tabs.Trigger>
                            <Tabs.Trigger value="narrow">Narrow</Tabs.Trigger>
                        </Tabs.List>
                    </div>
                </Tabs.Root>
                <Switch bind:checked={studio.glassBackdrop} label="Glass backdrop" />
            </div>
            <nav aria-label="Footer" class="flex items-center gap-5">
                <a
                    class="rounded-[var(--radius-sm)] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                    href="/docs/changelog"
                >
                    Changelog
                </a>
                <a
                    class="rounded-[var(--radius-sm)] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                    href="https://github.com/mielsense/mielui"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>
            </nav>
        </div>
    {/if}
</footer>
