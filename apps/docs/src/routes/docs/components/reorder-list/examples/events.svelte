<script lang="ts">
    import * as ReorderList from '@mielui/svelte/components/reorder-list';
    import { Switch } from '@mielui/svelte/components/switch';

    let items = $state([
        { id: 'triage', name: 'Triage' },
        { id: 'build', name: 'Build' },
        { id: 'review', name: 'Review' }
    ]);
    let locked = $state(false);
    let saved = $state('Order not saved yet');
</script>

<div class="flex w-full max-w-sm flex-col gap-3">
    <Switch bind:checked={locked} label="Lock the order" />
    <ReorderList.Root
        bind:items
        getId={(item) => item.id}
        getLabel={(item) => item.name}
        label="Workflow stages"
        disabled={locked}
        onReorder={(next) => {
            saved = `Saved: ${next.map((item) => item.name).join(', ')}`;
        }}
    >
        {#snippet row(item)}
            <ReorderList.Item id={item.id} label={item.name}>
                <ReorderList.Content>{item.name}</ReorderList.Content>
                <ReorderList.Handle />
            </ReorderList.Item>
        {/snippet}
    </ReorderList.Root>
    <p role="status" class="text-sm text-foreground-muted">{saved}</p>
</div>
