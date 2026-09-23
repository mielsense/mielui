<script lang="ts">
    import { onMount } from 'svelte';
    import type { PreviewExample } from '$lib/preview-examples';

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

    function connectFrame() {
        syncTheme();
        detachWheel?.();
        const document = frame.contentDocument;
        if (!document) {
            return;
        }
        function forwardWheel(event: WheelEvent) {
            if (event.defaultPrevented || event.ctrlKey || !event.deltaY) {
                return;
            }
            let target = event.target as Element | null;
            while (target && target !== document?.documentElement) {
                if (canScroll(target, event.deltaY)) {
                    return;
                }
                target = target.parentElement;
            }
            let parent = frame.parentElement;
            while (parent) {
                if (canScroll(parent, event.deltaY)) {
                    const factor =
                        event.deltaMode === 1
                            ? 16
                            : event.deltaMode === 2
                              ? parent.clientHeight
                              : 1;
                    parent.scrollTop += event.deltaY * factor;
                    event.preventDefault();
                    return;
                }
                parent = parent.parentElement;
            }
        }
        document.addEventListener('wheel', forwardWheel, { passive: false });
        detachWheel = () => document.removeEventListener('wheel', forwardWheel);
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
    class="h-[min(48svh,28rem)] min-h-80 w-full border-0 bg-[var(--docs-content)]"
></iframe>
