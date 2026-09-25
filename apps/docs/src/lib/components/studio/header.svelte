<script lang="ts">
    import Button from '@mielui/svelte/components/button';
    import * as Select from '@mielui/svelte/components/select';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { resolve } from '$app/paths';
    import Logo from '$lib/components/logo.svelte';
    import SearchButton from '$lib/components/search/trigger.svelte';
    import HeaderActions from '$lib/components/shell/header-actions.svelte';
    import { getStudioContext } from '$lib/studio-context';

    const { starCount = null }: { starCount?: number | null } = $props();
    const studio = getStudioContext();
    const previewTabs = [
        { value: 'components', label: 'Components' },
        { value: 'charts', label: 'Charts' },
        { value: 'ai', label: 'AI components' },
        { value: 'app', label: 'App preview' }
    ];
</script>

<header
    class="relative z-20 bg-[var(--docs-content)] after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-4 after:bg-linear-to-b after:from-[var(--docs-content)] after:to-transparent"
>
    <div
        class="flex h-[calc(var(--docs-row-height)-var(--border-size))] w-full items-center justify-between pl-14 pr-3 sm:pl-18"
    >
        <div class="shrink-0 [&_span]:hidden sm:[&_span]:inline"><Logo /></div>
        <div class="min-w-0 flex-1 px-2 min-[68.75rem]:pl-6 min-[68.75rem]:pr-3">
            <Tabs.Root bind:value={studio.mode} variant="ghost" class="hidden lg:block">
                <div role="group" aria-label="Preview content">
                    <Tabs.List>
                        {#each previewTabs as tab (tab.value)}
                            <Tabs.Trigger value={tab.value}>{tab.label}</Tabs.Trigger>
                        {/each}
                    </Tabs.List>
                </div>
            </Tabs.Root>
            <div class="lg:hidden">
                <Select.Root bind:value={studio.mode}>
                    <Select.Trigger aria-label="Preview content" class="w-full max-w-40">
                        <span class="truncate">
                            {previewTabs.find((tab) => tab.value === studio.mode)?.label}
                        </span>
                    </Select.Trigger>
                    <Select.Content>
                        {#each previewTabs as tab (tab.value)}
                            <Select.Item value={tab.value}>{tab.label}</Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>
            </div>
        </div>
        <div class="flex shrink-0 items-center gap-1.5 min-[68.75rem]:pr-5">
            <div class="hidden sm:block"><SearchButton /></div>
            <Button variant="quiet" href={resolve('/docs/introduction')}>Docs</Button>
            <HeaderActions {starCount} />
        </div>
    </div>
</header>
