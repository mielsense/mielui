<script lang="ts">
    import { onMount } from 'svelte';
    import type { PreviewExample } from '#lib/preview-examples.js';

    let {
        example,
        title
    }: {
        example: PreviewExample;
        title: string;
    } = $props();
    let frame: HTMLIFrameElement;

    let detachWheel: (() => void) | undefined;

    function canScroll(element: Element, delta: number) {
        const overflow = getComputedStyle(element).overflowY;
        return (
            /(auto|scroll)/.test(overflow) &&
            (delta < 0
                ? element.scrollTop > 0
                : element.scrollTop + element.clientHeight < element.scrollHeight - 1)
        );
    }

    function wheelUnit(event: WheelEvent, scroller: Element) {
        if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
            return 16;
        }
        if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
            return scroller.clientHeight;
        }

        return 1;
    }

    function connectFrame() {
        syncTheme();
        detachWheel?.();
        const frameDocument = frame.contentDocument;
        if (!frameDocument) {
            return;
        }
        const frameRoot = frameDocument.documentElement;

        function forwardWheel(event: WheelEvent) {
            if (event.defaultPrevented || event.ctrlKey || !event.deltaY) {
                return;
            }
            let target = event.target as Element | null;
            while (target && target !== frameRoot) {
                if (canScroll(target, event.deltaY)) {
                    return;
                }
                target = target.parentElement;
            }
            let parent = frame.parentElement;
            while (parent) {
                if (canScroll(parent, event.deltaY)) {
                    parent.scrollTop += event.deltaY * wheelUnit(event, parent);
                    event.preventDefault();
                    return;
                }
                parent = parent.parentElement;
            }
        }
        frameDocument.addEventListener('wheel', forwardWheel, { passive: false });
        detachWheel = () => frameDocument.removeEventListener('wheel', forwardWheel);
    }

    function syncTheme() {
        const target = frame?.contentDocument?.documentElement;
        if (!target) {
            return;
        }
        const source = document.documentElement;
        target.classList.toggle('dark', source.classList.contains('dark'));
        target.classList.toggle('light', source.classList.contains('light'));
        target.style.colorScheme = getComputedStyle(source).colorScheme;
        const tokens = getComputedStyle(source);
        for (let index = 0; index < tokens.length; index += 1) {
            const name = tokens.item(index);
            if (name.startsWith('--')) {
                target.style.setProperty(name, tokens.getPropertyValue(name));
            }
        }
    }

    onMount(() => {
        const observer = new MutationObserver(syncTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'style']
        });
        observer.observe(document.head, { childList: true, subtree: true, characterData: true });
        return () => {
            observer.disconnect();
            detachWheel?.();
        };
    });
</script>

<iframe
    bind:this={frame}
    src={`/preview/${example}`}
    {title}
    onload={connectFrame}
    class="h-[min(48svh,28rem)] min-h-80 w-full border-0 bg-card"
></iframe>
