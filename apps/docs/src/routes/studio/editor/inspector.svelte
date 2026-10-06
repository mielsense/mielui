<script lang="ts">
    import { Search01Icon as Search } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { Input } from '@mielui/svelte/components/input';
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

    const filter = createSettingFilter();
    setSettingFilter(filter);

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
    <div class="shrink-0 px-3 pt-1 pb-3">
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
    </div>
    <FadeScrollArea class="flex-1" start hideScrollbar>
        <div bind:this={list} class="flex min-h-full flex-col gap-5 px-3 pb-6">
            <Preset />
            <Colors />
            <Appearance />
            <Shape />
            <Interaction />
            <Typography />
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
        </div>
    </FadeScrollArea>
    <ExportActions />
</div>
