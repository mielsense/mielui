<script lang="ts">
    const {
        edge = 'bottom',
        fill = false
    }: {
        edge?: 'top' | 'bottom';
        /** Fades to the content surface instead of relying on a mask. Shorter and calmer. */
        fill?: boolean;
    } = $props();

    const position = $derived(
        edge === 'top'
            ? 'top-0 opacity-[var(--fade-start-opacity,0)] [mask-image:linear-gradient(to_bottom,black,transparent)]'
            : 'bottom-0 opacity-[var(--fade-end-opacity,0)] [mask-image:linear-gradient(to_top,black,transparent)]'
    );
    const gradient = $derived(edge === 'top' ? 'bg-linear-to-b' : 'bg-linear-to-t');
    const surface = $derived(
        fill
            ? `h-5 ${gradient} from-[var(--docs-content)] to-transparent backdrop-blur-[3px]`
            : 'h-12 backdrop-blur-[3px]'
    );
</script>

<!--
    @component
    A soft blur over one edge of a scroller. Place it beside the scroller inside a
    positioned parent that `scrollFade({ target: 'parent' })` writes to.
-->

<div
    aria-hidden="true"
    data-scroll-edge={edge}
    class={`pointer-events-none absolute inset-x-0 z-10 ${position} ${surface}`}
></div>
