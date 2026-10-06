<script lang="ts">
    import { Search01Icon as Search } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { Input } from '@mielui/svelte/components/input';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { tick } from 'svelte';
    import FadeScrollArea from '$lib/components/shell/fade-scroll-area.svelte';
    import Appearance from './appearance.svelte';
    import Colors from './colors.svelte';
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
            parts: [Colors]
        },
        {
            value: 'type',
            label: 'Type',
            parts: [Typography]
        },
        {
            value: 'shape',
            label: 'Shape',
            parts: [Shape]
        },
        {
            value: 'surface',
            label: 'Surface',
            parts: [Appearance]
        },
        {
            value: 'motion',
            label: 'Motion',
            parts: [Interaction]
        }
    ];

    const filter = createSettingFilter();
    setSettingFilter(filter);

    let group = $state('color');
    let list = $state<HTMLDivElement>();
    let empty = $state(false);
    const view = $derived(filter.active ? 'search' : group);

    function openGroup(value: string) {
        group = value;
        filter.query = '';
    }

    $effect(() => {
        void filter.query;
        void tick().then(() => {
            empty = filter.active && !list?.querySelector('[data-setting-row]');
        });
    });
</script>

<Tabs.Root
    value={filter.active ? '' : group}
    onValueChange={openGroup}
    class="flex min-h-0 flex-1 flex-col"
>
    <div class="flex shrink-0 flex-col gap-2 px-3 pt-1">
        <Input
            bind:value={filter.query}
            type="search"
            aria-label="Search settings"
            placeholder="Search settings"
            class="w-full"
        >
            {#snippet trailing()}
                <HugeiconsIcon icon={Search} size={16} aria-hidden="true" />
            {/snippet}
        </Input>
        <Preset />
        <Tabs.List
            class="mt-1 flex w-full shadow-[inset_0_calc(var(--size-hairline)*-1)_0_var(--docs-rule)]"
        >
            {#each groups as item (item.value)}
                <Tabs.Trigger value={item.value} class="min-w-0 flex-1 px-1">
                    {item.label}
                </Tabs.Trigger>
            {/each}
        </Tabs.List>
    </div>
    {#key view}
        <FadeScrollArea class="flex-1" start hideScrollbar>
            <div bind:this={list} class="flex min-h-full flex-col gap-5 px-3 pt-4 pb-6">
                {#if filter.active}
                    {#each groups as item (item.value)}
                        {#each item.parts as Part (Part)}
                            <Part />
                        {/each}
                    {/each}
                    {#if empty}
                        <div class="flex flex-col items-start gap-3 px-3 pt-2">
                            <p class="m-0 text-sm text-foreground-muted">
                                {`No settings match “${filter.query.trim()}”.`}
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
                {:else}
                    {#each groups as item (item.value)}
                        <Tabs.Content value={item.value} class="flex flex-col gap-5">
                            {#each item.parts as Part (Part)}
                                <Part />
                            {/each}
                        </Tabs.Content>
                    {/each}
                {/if}
            </div>
        </FadeScrollArea>
    {/key}
    <ExportActions />
</Tabs.Root>
