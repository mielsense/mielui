<script lang="ts">
    import ComponentCatalog from '#lib/components/docs/component-catalog.svelte';
    import { componentTypes, navigationGroups } from '#lib/components.js';
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
