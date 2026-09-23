import { tick } from 'svelte';
import { prefersReducedMotion } from 'svelte/motion';
import { replaceState } from '$app/navigation';
import { page } from '$app/state';

type Heading = { id: string; label: string; level: number; node: HTMLElement };

export function createPageOutline(getContent: () => HTMLElement | undefined) {
    let headings = $state<Heading[]>([]);
    let active = $state('');
    let destination: string | null = null;
    let jumpVersion = 0;
    let jumpStarted = false;
    let hovered = $state<string | null>(null);
    let focused = $state<string | null>(null);
    let list = $state<HTMLDivElement>();
    let centers = $state<Record<string, number>>({});
    const activeY = $derived(centers[active] ?? null);
    const preview = $derived(focused ?? hovered);
    const previewY = $derived(preview && preview !== active ? (centers[preview] ?? null) : null);
    const previewFrom = $derived(
        activeY !== null && previewY !== null && previewY <= activeY
            ? Math.max(0, previewY - 6)
            : (activeY ?? 0)
    );

    function headingTop(heading: Heading) {
        const section = heading.node.closest<HTMLElement>('section');
        const anchor = heading.level === 2 && section ? section : heading.node;
        return anchor.getBoundingClientRect().top;
    }

    function headingInset(heading: Heading) {
        const toolbar = getContent()?.querySelector<HTMLElement>('[data-docs-toolbar]');
        const toolbarHeight = toolbar?.getBoundingClientRect().height ?? 0;
        if (heading.level !== 3) {
            return toolbarHeight;
        }
        let section = heading.node.closest('section');
        while (section) {
            const title = section.querySelector<HTMLElement>(
                ':scope > h2, :scope > div:first-child:has(> h2)'
            );
            if (title) {
                return toolbarHeight + title.getBoundingClientRect().height;
            }
            section = section.parentElement?.closest('section') ?? null;
        }
        return toolbarHeight;
    }

    async function navigate(event: MouseEvent, heading: Heading) {
        if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }
        const scroll = getContent()?.closest<HTMLElement>('[data-docs-scroll]');
        if (!scroll) {
            return;
        }
        event.preventDefault();
        const version = ++jumpVersion;
        destination = heading.id;
        active = heading.id;
        jumpStarted = false;
        for (const preview of getContent()?.querySelectorAll('[data-component-preview]') ?? []) {
            if (preview.compareDocumentPosition(heading.node) & Node.DOCUMENT_POSITION_FOLLOWING) {
                preview.dispatchEvent(new Event('docs-activate-preview'));
            }
        }
        await tick();
        await new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        );
        if (version !== jumpVersion || !heading.node.isConnected || !scroll.isConnected) {
            return;
        }
        const top =
            scroll.scrollTop +
            headingTop(heading) -
            scroll.getBoundingClientRect().top -
            headingInset(heading);
        replaceState(`#${heading.id}`, page.state);
        heading.node.setAttribute('tabindex', '-1');
        heading.node.classList.add('focus:outline-none');
        heading.node.focus({ preventScroll: true });
        jumpStarted = true;
        if (Math.abs(scroll.scrollTop - top) < 1) {
            destination = null;
            jumpStarted = false;
        }
        scroll.scrollTo({ top, behavior: prefersReducedMotion.current ? 'instant' : 'smooth' });
    }

    $effect(() => {
        page.url.pathname;
        const root = getContent();
        if (!root) {
            return;
        }
        const scroll = root.closest<HTMLElement>('[data-docs-scroll]');
        let frame = 0;
        let scrollFrame = 0;
        let disposed = false;
        let settleTimer: ReturnType<typeof setTimeout> | undefined;
        function updateActive() {
            if (destination !== null) {
                active = destination;
                return;
            }
            const top = (scroll?.getBoundingClientRect().top ?? 0) + 2;
            let current = headings[0]?.id ?? '';
            for (const heading of headings) {
                if (headingTop(heading) <= top + headingInset(heading)) {
                    current = heading.id;
                }
            }
            if (scroll && scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 4) {
                current = headings.at(-1)?.id ?? current;
            }
            active = current;
        }
        function finishJump() {
            clearTimeout(settleTimer);
            if (!jumpStarted) {
                return;
            }
            destination = null;
            jumpStarted = false;
            updateActive();
        }
        function trackScroll() {
            cancelAnimationFrame(scrollFrame);
            scrollFrame = requestAnimationFrame(updateActive);
            clearTimeout(settleTimer);
            settleTimer = setTimeout(finishJump, 180);
        }
        function interruptJump() {
            jumpVersion += 1;
            destination = null;
            jumpStarted = false;
            clearTimeout(settleTimer);
            updateActive();
        }
        function interruptWithKey(event: KeyboardEvent) {
            if (
                ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(
                    event.key
                )
            ) {
                interruptJump();
            }
        }
        function collect() {
            if (disposed || !root) {
                return;
            }
            const found = [...root.querySelectorAll<HTMLElement>('h2, h3')].filter(
                (node) => !node.closest('[data-component-preview]')
            );
            const ids = new Set<string>();
            const next = found.map((node) => {
                const label = node.textContent?.trim() ?? '';
                const section = node.closest<HTMLElement>('section[id], div[id]');
                const base =
                    node.id ||
                    section?.id ||
                    label
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-|-$/g, '') ||
                    'section';
                let id = base;
                let suffix = 2;
                while (ids.has(id)) {
                    id = `${base}-${suffix++}`;
                }
                ids.add(id);
                if (!node.id && section?.id !== id) {
                    node.id = id;
                }
                node.classList.add('scroll-mt-8');
                return { id, label, level: node.tagName === 'H3' ? 3 : 2, node };
            });
            if (
                next.length !== headings.length ||
                next.some(
                    (item, index) =>
                        item.id !== headings[index]?.id ||
                        item.label !== headings[index]?.label ||
                        item.node !== headings[index]?.node
                )
            ) {
                headings = next;
            }
            updateActive();
        }
        function schedule() {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(collect);
        }
        const observer = new MutationObserver((records) => {
            if (
                records.some(
                    (record) =>
                        !(
                            record.target instanceof Element
                                ? record.target
                                : record.target.parentElement
                        )?.closest('[data-component-preview]')
                )
            ) {
                schedule();
            }
        });
        observer.observe(root, { childList: true, subtree: true });
        const resize = new ResizeObserver(schedule);
        resize.observe(root);
        scroll?.addEventListener('scroll', trackScroll, { passive: true });
        scroll?.addEventListener('scrollend', finishJump);
        scroll?.addEventListener('wheel', interruptJump, { passive: true });
        scroll?.addEventListener('touchstart', interruptJump, { passive: true });
        scroll?.addEventListener('keydown', interruptWithKey);
        void tick().then(collect);
        return () => {
            disposed = true;
            cancelAnimationFrame(frame);
            cancelAnimationFrame(scrollFrame);
            observer.disconnect();
            resize.disconnect();
            scroll?.removeEventListener('scroll', trackScroll);
            scroll?.removeEventListener('scrollend', finishJump);
            scroll?.removeEventListener('wheel', interruptJump);
            scroll?.removeEventListener('touchstart', interruptJump);
            scroll?.removeEventListener('keydown', interruptWithKey);
            clearTimeout(settleTimer);
            destination = null;
            jumpStarted = false;
            jumpVersion += 1;
        };
    });

    $effect(() => {
        const element = list;
        headings;
        if (!element) {
            return;
        }
        let disposed = false;
        function measure() {
            if (disposed || !element) {
                return;
            }
            const next: Record<string, number> = {};
            for (const anchor of element.querySelectorAll<HTMLAnchorElement>('a[data-heading]')) {
                next[anchor.dataset.heading ?? ''] = anchor.offsetTop + anchor.offsetHeight / 2;
            }
            centers = next;
        }
        const observer = new ResizeObserver(measure);
        observer.observe(element);
        void tick().then(measure);
        return () => {
            disposed = true;
            observer.disconnect();
        };
    });

    return {
        get headings() {
            return headings;
        },
        get active() {
            return active;
        },
        get hovered() {
            return hovered;
        },
        set hovered(value: string | null) {
            hovered = value;
        },
        get focused() {
            return focused;
        },
        set focused(value: string | null) {
            focused = value;
        },
        get list() {
            return list;
        },
        set list(value: HTMLDivElement | undefined) {
            list = value;
        },
        get activeY() {
            return activeY;
        },
        get previewY() {
            return previewY;
        },
        get previewFrom() {
            return previewFrom;
        },
        navigate
    };
}
