<script lang="ts">
    import * as ReorderList from '@mielui/svelte/components/reorder-list';

    let items = $state([
        { id: 'brief', name: 'Project brief' },
        { id: 'design', name: 'Design review' },
        { id: 'release', name: 'Release notes' }
    ]);
</script>
<ReorderList.Root
    bind:items
    getId={(item) => item.id}
    getLabel={(item) => item.name}
    label="Project documents"
    class="w-full max-w-sm"
>
    {#snippet row(item)}
        <ReorderList.Item id={item.id} label={item.name}>
            <ReorderList.Content>{item.name}</ReorderList.Content>
            <ReorderList.Handle />
        </ReorderList.Item>
    {/snippet}
</ReorderList.Root>
