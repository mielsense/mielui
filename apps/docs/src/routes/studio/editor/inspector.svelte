<script lang="ts">
    import { Search01Icon as Search } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { Input } from '@mielui/svelte/components/input';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { tick } from 'svelte';
    import FadeScrollArea from '$lib/components/shell/fade-scroll-area.svelte';
    import { searchField } from '$lib/components/shell/look';
    import Appearance from './appearance.svelte';
    import Colors from './colors.svelte';
    import { disclosure } from './controls.svelte';
    import ExportActions from './export-actions.svelte';
    import Interaction from './interaction.svelte';
    import Preset from './preset.svelte';
    import { createSettingFilter, setSettingFilter } from './setting-filter.svelte';
    import Shape from './shape.svelte';
    import Typography from './typography.svelte';

    const groups = [Colors, Typography, Shape, Appearance, Interaction];

    const filter = createSettingFilter();
    setSettingFilter(filter);

    let allOpen = $state(false);
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
                        {#each groups as Group, index (index)}
                            <Group essentials />
                        {/each}
                    </div>
                    {@render disclosure('All settings', allOpen, () => {
                        allOpen = !allOpen;
                    })}
                {/if}
                {#if filter.active || allOpen}
                    {#each groups as Group, index (index)}
                        <Group />
                    {/each}
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
