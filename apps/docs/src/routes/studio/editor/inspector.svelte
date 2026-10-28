<script lang="ts">
    import { Search01Icon as Search } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { Input } from '@mielui/svelte/components/input';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { tick } from 'svelte';
    import FadeScrollArea from '#lib/components/shell/fade-scroll-area.svelte';
    import { searchField } from '#lib/components/shell/look.js';
    import Appearance from './appearance.svelte';
    import Colors from './colors.svelte';
    import { disclosure } from './controls.svelte';
    import ExportActions from './export-actions.svelte';
    import Interaction from './interaction.svelte';
    import Preset from './preset.svelte';
    import { createSettingFilter, setSettingFilter } from './setting-filter.svelte';
    import Shape from './shape.svelte';
    import Typography from './typography.svelte';

    const groups = [
        {
            value: 'color',
            label: 'Color',
            component: Colors
        },
        {
            value: 'type',
            label: 'Type',
            component: Typography
        },
        {
            value: 'shape',
            label: 'Shape',
            component: Shape
        },
        {
            value: 'surface',
            label: 'Surface',
            component: Appearance
        },
        {
            value: 'motion',
            label: 'Motion',
            component: Interaction
        }
    ];

    const filter = createSettingFilter();
    setSettingFilter(filter);

    let allOpen = $state(false);
    let group = $state('color');
    const openGroup = $derived(groups.find((item) => item.value === group) ?? groups[0]);
    let list = $state<HTMLDivElement>();
    let empty = $state(false);

    $effect(() => {
        void filter.query;
        void tick().then(() => {
            empty = filter.active && !list?.querySelector('[data-setting-row]');
        });
    });
</script>

<div class="flex min-h-0 flex-1 flex-col">
    <div class="flex shrink-0 flex-col gap-3 px-3 pt-1 lg:pt-0">
        <div class={searchField}>
            <Input
                bind:value={filter.query}
                type="search"
                aria-label="Search settings"
                placeholder="Search settings"
                class="w-full"
            >
                {#snippet leading()}
                    <HugeiconsIcon icon={Search} size={14} aria-hidden="true" />
                {/snippet}
            </Input>
        </div>
        <Preset />
    </div>
    {#key filter.active}
        <FadeScrollArea class="flex-1" start hideScrollbar>
            <div bind:this={list} class="flex min-h-full flex-col gap-5 px-3 pt-3 pb-6">
                {#if !filter.active}
                    <div class="flex flex-col gap-0.5">
                        {#each groups as item (item.value)}
                            <item.component essentials />
                        {/each}
                    </div>
                    {@render disclosure('All settings', allOpen, () => {
                        allOpen = !allOpen;
                    })}
                {/if}
                {#if filter.active}
                    {#each groups as item (item.value)}
                        <item.component />
                    {/each}
                {:else if allOpen}
                    <Tabs.Root bind:value={group} variant="ghost" class="-mt-2">
                        <Tabs.List aria-label="Setting groups" class="flex w-full">
                            {#each groups as item (item.value)}
                                <Tabs.Trigger value={item.value} class="min-w-0 flex-1 px-1">
                                    {item.label}
                                </Tabs.Trigger>
                            {/each}
                        </Tabs.List>
                    </Tabs.Root>
                    <openGroup.component />
                {/if}
                {#if filter.active && empty}
                    <div class="flex flex-col items-start gap-3 px-3 pt-2">
                        <p class="m-0 text-sm text-foreground-muted">
                            {`No settings match "${filter.query.trim()}".`}
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onclick={() => {
                                filter.query = '';
                            }}
                        >
                            Clear search
                        </Button>
                    </div>
                {/if}
            </div>
        </FadeScrollArea>
    {/key}
    <ExportActions />
</div>
