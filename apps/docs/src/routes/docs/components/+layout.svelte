<script lang="ts">
    import type { Snippet } from 'svelte';
    import { page } from '$app/state';
    import { type ComponentSlug, componentAnatomy } from '$lib/component-anatomy';
    import ComponentReference from '$lib/components/docs/component-reference.svelte';
    import type { LayoutData } from './$types';

    let { children, data }: { children: Snippet; data: LayoutData } = $props();
    const slug = $derived(page.url.pathname.split('/').at(-1) as ComponentSlug);
    const anatomy = $derived(componentAnatomy[slug]);
    const title = $derived(
        slug === 'otp-field'
            ? 'OTPField'
            : slug
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join('')
    );
</script>

{@render children?.()}

{#if data.reference.length}
    <ComponentReference parts={data.reference} {title} {anatomy} />
{/if}
