<script lang="ts">
    import ComponentCatalog from '$lib/components/docs/component-catalog.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<svelte:head>
    <title>{`Mielui · ${data.group.heading}`}</title>
    <meta name="description" content={data.group.description} />
</svelte:head>

<ComponentCatalog
    groups={[data.group]}
    descriptions={data.descriptions}
    title={data.group.heading}
    description={data.group.description}
/>
