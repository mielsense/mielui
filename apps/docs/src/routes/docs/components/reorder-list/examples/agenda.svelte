<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as ReorderList from '@mielui/svelte/components/reorder-list';

    const initial = [
        {
            id: 'opening',
            name: 'Opening remarks',
            duration: '5 min'
        },
        {
            id: 'roadmap',
            name: 'Roadmap review',
            duration: '15 min'
        },
        {
            id: 'critique',
            name: 'Design critique',
            duration: '20 min'
        },
        {
            id: 'questions',
            name: 'Open questions',
            duration: '10 min'
        }
    ];

    let items = $state([...initial]);

    function reset() {
        items = [...initial];
    }
</script>

<div class="flex w-full max-w-md flex-col gap-3">
    <div class="flex justify-end">
        <Button variant="ghost" onclick={reset}>Reset</Button>
    </div>
    <ReorderList.Root
        bind:items
        getId={(item) => item.id}
        getLabel={(item) => item.name}
        label="Meeting agenda"
    >
        {#snippet children(item)}
            <span class="flex min-w-0 items-center justify-between gap-4">
                <span class="truncate text-sm font-medium">{item.name}</span>
                <span class="shrink-0 text-xs tabular-nums text-foreground-muted">
                    {item.duration}
                </span>
            </span>
        {/snippet}
    </ReorderList.Root>
    <p class="text-xs leading-relaxed text-foreground-muted">
        Drag a handle, or focus it and press Space to grab its row. Arrow keys move; Escape cancels.
    </p>
</div>
