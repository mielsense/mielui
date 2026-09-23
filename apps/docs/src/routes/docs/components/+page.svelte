<script lang="ts">
    import { componentTypes, navigationGroups } from '$lib/components';
    import ComponentCatalog from '$lib/components/docs/component-catalog.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    const groups = [
        ...componentTypes,
        ...navigationGroups.filter((group) => group.id !== 'components')
    ];
</script>

<svelte:head>
    <title>Mielui · Components</title>
    <meta
        name="description"
        content="Browse Mielui components by purpose, including inputs, forms, overlays, charts, and motion actions."
    />
</svelte:head>

<ComponentCatalog {groups} descriptions={data.descriptions} />
