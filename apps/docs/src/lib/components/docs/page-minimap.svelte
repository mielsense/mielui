<script lang="ts">
    import type { PageOutline } from './page-outline.svelte';

    let { outline }: { outline: PageOutline } = $props();

    const reach = 44;
    const rowHeight = 10;

    let rail = $state<HTMLElement>();
    let pointer = $state<number>();
    let top = $state(0);
    let step = $state(rowHeight);
    let focused = $state<string>();

    const hovered = $derived.by(() => {
        if (pointer === undefined || !outline.headings.length) {
            return undefined;
        }
        const index = Math.floor((pointer - top) / step);
        const clamped = Math.min(outline.headings.length - 1, Math.max(0, index));

        return outline.headings[clamped];
    });
    const labelled = $derived(
        hovered ?? outline.headings.find((heading) => heading.id === focused)
    );
    const labelIndex = $derived(
        labelled ? outline.headings.findIndex((heading) => heading.id === labelled.id) : -1
    );

    function measure() {
        if (!rail) {
            return;
        }
        const bounds = rail.getBoundingClientRect();

        top = bounds.top;
        step = bounds.height / Math.max(1, outline.headings.length);
    }

    function track(event: PointerEvent) {
        measure();
        pointer = event.clientY;
    }

    function release() {
        pointer = undefined;
    }

    function growth(index: number) {
        if (pointer === undefined) {
            return 0;
        }
        const center = top + (index + 0.5) * step;
        const distance = Math.min(1, Math.abs(pointer - center) / reach);

        return (1 + Math.cos(distance * Math.PI)) / 2;
    }

    function length(level: number, active: boolean, index: number) {
        const base = level === 3 ? 10 : 18;
        const rest = active ? base + 8 : base;

        return rest + (40 - rest) * growth(index) * 0.8;
    }

    function tone(id: string, level: number) {
        if (id === outline.active || id === labelled?.id) {
            return 'bg-foreground';
        }

        return level === 3 ? 'bg-foreground/20' : 'bg-foreground/35';
    }
</script>

<!--
    @component
    The page outline as a rail of dashes, one per heading. Dashes swell toward the pointer, and
    the nearest one names its section.
-->

{#if outline.headings.length > 1}
    <nav aria-label="On this page" class="relative flex max-h-full min-h-0 items-center">
        <div
            bind:this={rail}
            role="presentation"
            onpointerenter={track}
            onpointermove={track}
            onpointerleave={release}
            class="flex max-h-full min-h-0 flex-col items-end ps-6"
        >
            {#each outline.headings as heading, index (heading.id)}
                <a
                    href={`#${heading.id}`}
                    aria-label={heading.label}
                    aria-current={outline.active === heading.id ? 'location' : undefined}
                    onclick={(event) => outline.navigate(event, heading)}
                    onfocus={() => {
                        focused = heading.id;
                    }}
                    onblur={() => {
                        focused = undefined;
                    }}
                    class="flex h-2.5 min-h-0 w-10 shrink items-center justify-end rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                >
                    <span
                        style:transform={`scaleX(${length(heading.level, outline.active === heading.id, index) / 40})`}
                        class={`block h-px w-10 origin-right transition-[transform,background-color] duration-150 ease-[var(--ease-out)] motion-reduce:transition-none ${tone(heading.id, heading.level)}`}
                    ></span>
                </a>
            {/each}
        </div>
        <div
            aria-hidden="true"
            style:top={`${(Math.max(0, labelIndex) + 0.5) * step}px`}
            class={`pointer-events-none absolute end-[calc(100%-var(--spacing)*4)] -translate-y-1/2 rounded-[var(--radius-sm)] bg-[var(--docs-content)] px-2 py-1 text-xs leading-4 font-medium whitespace-nowrap text-foreground shadow-[0_0_0_var(--border-size)_var(--color-border),var(--elevation-1)] transition-[top,opacity] duration-150 ease-[var(--ease-out)] motion-reduce:transition-none ${labelled ? 'opacity-100' : 'opacity-0'}`}
        >
            {labelled?.label ?? ''}
        </div>
    </nav>
{/if}
