<script lang="ts">
    import type { Snippet } from 'svelte';
    import ScrollEdge from './scroll-edge.svelte';
    import { scrollFade } from './scroll-fade';

    let {
        label,
        wide = false,
        header,
        footer,
        children
    }: {
        label: string;
        /** The Studio settings panel's width instead of the docs sidebar's. */
        wide?: boolean;
        header?: Snippet;
        footer?: Snippet;
        children: Snippet;
    } = $props();
</script>

<aside
    aria-label={label}
    class={`hidden h-full shrink-0 lg:block ${wide ? 'w-[21rem]' : 'w-[16.5rem]'}`}
>
    <div class="relative flex h-full w-full flex-col">
        {@render header?.()}
        <div class="relative flex min-h-0 flex-1 flex-col pt-1">
            <div
                {@attach scrollFade({ start: false, size: 40, target: 'parent' })}
                class="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain"
            >
                {@render children()}
            </div>
            <ScrollEdge edge="bottom" fill />
        </div>
        {@render footer?.()}
    </div>
</aside>
