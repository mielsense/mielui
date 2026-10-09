<script lang="ts">
    import type { Snippet } from 'svelte';
    import ScrollEdge from './scroll-edge.svelte';
    import { scrollFade } from './scroll-fade';
    import { getShell, sidebarWidths } from './shell.svelte';

    const {
        label,
        wide = false,
        header,
        footer,
        children
    }: {
        label: string;
        wide?: boolean;
        header?: Snippet;
        footer?: Snippet;
        children: Snippet;
    } = $props();

    const shell = getShell();
    const kind = $derived(wide ? 'studio' : 'docs');
    const width = $derived(shell.sidebarWidth(kind));
    const STEP = 16;

    let dragging = $state(false);
    let drag:
        | { pointer: number; startX: number; startWidth: number; direction: number }
        | undefined;

    function startResize(event: PointerEvent & { currentTarget: HTMLElement }) {
        if (event.button !== 0) {
            return;
        }
        event.preventDefault();
        drag = {
            pointer: event.pointerId,
            startX: event.clientX,
            startWidth: width,
            direction: getComputedStyle(event.currentTarget).direction === 'rtl' ? -1 : 1
        };
        dragging = true;
        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function moveResize(event: PointerEvent) {
        if (!drag || event.pointerId !== drag.pointer) {
            return;
        }
        const distance = (event.clientX - drag.startX) * drag.direction;
        shell.resizeSidebar(kind, drag.startWidth + distance);
    }

    function endResize(event: PointerEvent) {
        if (!drag || event.pointerId !== drag.pointer) {
            return;
        }
        drag = undefined;
        dragging = false;
    }

    function resizeWithKey(event: KeyboardEvent) {
        const targets: Record<string, number> = {
            ArrowLeft: width - STEP,
            ArrowRight: width + STEP,
            Home: sidebarWidths.min,
            End: sidebarWidths.max
        };
        const next = targets[event.key];
        if (next === undefined) {
            return;
        }
        event.preventDefault();
        shell.resizeSidebar(kind, next);
    }
</script>

<svelte:window
    onkeydown={(event) => {
        const target = event.target;
        const typing =
            target instanceof HTMLElement &&
            (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
        if (!typing && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'b') {
            event.preventDefault();
            shell.toggle();
        }
    }}
/>

<aside
    aria-label={label}
    inert={shell.collapsed}
    style:--sidebar-width={`${width}px`}
    class={`hidden h-full shrink-0 overflow-clip lg:block ${shell.collapsed ? 'w-0' : 'w-[var(--sidebar-width)]'}`}
>
    <div
        class="relative flex h-full w-[var(--sidebar-width)] flex-col border-e-[length:var(--border-size)] border-border"
    >
        <!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
        <div
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize sidebar"
            aria-valuenow={width}
            aria-valuemin={sidebarWidths.min}
            aria-valuemax={sidebarWidths.max}
            tabindex={0}
            data-dragging={dragging || undefined}
            class="group absolute inset-y-0 -end-1 z-20 w-2 cursor-col-resize touch-none outline-none"
            onpointerdown={startResize}
            onpointermove={moveResize}
            onpointerup={endResize}
            onpointercancel={endResize}
            onkeydown={resizeWithKey}
            ondblclick={() => {
                shell.resizeSidebar(kind, sidebarWidths[kind]);
            }}
        >
            <span
                aria-hidden="true"
                class="absolute inset-y-0 end-[3px] w-0.5 rounded-full bg-primary opacity-0 transition-opacity [transition-duration:var(--motion-duration-hover)] group-hover:opacity-60 group-focus-visible:opacity-100 group-data-[dragging]:opacity-100 motion-reduce:transition-none"
            ></span>
        </div>
        {@render header?.()}
        <div class="relative flex min-h-0 flex-1 flex-col pt-3">
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
