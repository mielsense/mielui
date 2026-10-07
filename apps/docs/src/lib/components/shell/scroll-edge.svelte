<script lang="ts">
    const {
        edge = 'bottom'
    }: {
        edge?: 'top' | 'bottom';
    } = $props();

    const position = $derived(
        edge === 'top'
            ? 'top-0 opacity-[var(--fade-start-opacity,0)] [mask-image:linear-gradient(to_bottom,black,transparent)]'
            : 'bottom-0 opacity-[var(--fade-end-opacity,0)] [mask-image:linear-gradient(to_top,black,transparent)]'
    );
</script>

<!--
    @component
    A soft blur over one edge of a scroller. Place it beside the scroller inside a
    positioned parent that `scrollFade({ target: 'parent' })` writes to.
-->

<div
    aria-hidden="true"
    class={`pointer-events-none absolute inset-x-0 z-10 h-12 backdrop-blur-[3px] ${position}`}
></div>
