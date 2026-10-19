<script lang="ts">
    import { edgeBlurLayers } from './scroll-fade';

    let {
        edge = 'bottom',
        fill = false
    }: {
        edge?: 'top' | 'bottom';
        /** Fades to the content surface instead of relying on a mask. Shorter and calmer. */
        fill?: boolean;
    } = $props();

    const position = $derived(edge === 'top' ? 'top-0' : 'bottom-0');
    const reveal = $derived(
        edge === 'top'
            ? 'opacity-[var(--fade-start-opacity,0)]'
            : 'opacity-[var(--fade-end-opacity,0)]'
    );
    const surface = $derived(
        edge === 'top'
            ? 'bg-linear-to-b [mask-image:linear-gradient(to_bottom,black,transparent)]'
            : 'bg-linear-to-t [mask-image:linear-gradient(to_top,black,transparent)]'
    );
</script>

<!--
    @component
    A soft blur over one edge of a scroller that builds toward the edge, so text
    eases into it instead of meeting a line. Place it beside the scroller inside a
    positioned parent that `scrollFade({ target: 'parent' })` writes to.
-->

<div
    aria-hidden="true"
    data-scroll-edge={edge}
    class={`pointer-events-none absolute inset-x-0 z-10 ${position} ${fill ? 'h-5' : 'h-12'}`}
>
    {#each edgeBlurLayers as layer (layer)}
        <div class={`absolute inset-x-0 ${position} ${reveal} ${layer}`}></div>
    {/each}
    {#if fill}
        <div
            class={`absolute inset-0 ${reveal} ${surface} from-[var(--docs-content)] to-transparent`}
        ></div>
    {/if}
</div>
