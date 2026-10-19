<script lang="ts">
    import { type Snippet, untrack } from 'svelte';
    import { type ComponentSlug, componentAnatomy } from '$lib/component-anatomy';
    import ComponentReference from '$lib/components/docs/component-reference.svelte';
    import { rendersOnClient, revealAfterPaint } from '$lib/components/docs/preview';
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
    let revealedOwner = $state(rendersOnClient() ? undefined : untrack(() => data.owner));
    const referenceReady = $derived(revealedOwner === data.owner);
</script>

{@render children?.()}

<div
    {@attach referenceReady
        ? undefined
        : revealAfterPaint(() => {
              revealedOwner = data.owner;
          })}
>
    {#if referenceReady && data.reference.length}
        <ComponentReference parts={data.reference} {title} {anatomy} />
    {/if}
</div>
