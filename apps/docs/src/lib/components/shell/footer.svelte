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
    class={`relative z-40 before:pointer-events-none before:absolute before:inset-x-0 before:bottom-full before:h-4 before:bg-linear-to-t before:from-[var(--docs-content)] before:to-transparent flex h-[var(--docs-row-height)] shrink-0 bg-[var(--docs-content)] items-center justify-between gap-3 px-4 sm:px-5 text-xs text-foreground-muted ${isDocs ? 'xl:grid xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:gap-3 xl:px-5' : 'min-[68.75rem]:flex min-[68.75rem]:gap-6'}`}
>
    {#if isDocs}
        <div class="flex justify-start"><DocsPager /></div>
        <div class="flex justify-end"><CopyPage /></div>
        <div class="flex min-w-0 items-center gap-2 border-l border-border/50 pl-4">
            {#if pageInfo?.current}
                <HoverCard.Root>
                    <HoverCard.Trigger
                        class="size-8 [margin-inline-start:calc((18px-var(--spacing)*8)/2)] items-center justify-center rounded-[var(--radius-md)] text-foreground-muted hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                    >
                        <HugeiconsIcon icon={Info} size={18} />
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
                <span class="hidden truncate sm:inline">{pageInfo?.current.title}</span>
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
                    class="hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                    href="/docs/changelog"
                >
                    Changelog
                </a>
                <a
                    class="hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
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
