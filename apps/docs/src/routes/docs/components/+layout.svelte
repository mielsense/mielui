<script lang="ts">
    import type { Snippet } from 'svelte';
    import { type ComponentSlug, componentAnatomy } from '$lib/component-anatomy';
    import ComponentReference from '$lib/components/docs/component-reference.svelte';
    import type { LayoutData } from './$types';

    let { children, data }: { children: Snippet; data: LayoutData } = $props();
    const slug = $derived(data.owner as ComponentSlug | undefined);
    const anatomy = $derived(slug ? componentAnatomy[slug] : undefined);
    const title = $derived(
        (slug ?? '')
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join('')
    );
</script>

{@render children?.()}

{#if data.reference.length}
    <ComponentReference parts={data.reference} {title} {anatomy} />
{/if}
