import { tick } from 'svelte';
import { prefersReducedMotion } from 'svelte/motion';
import { replaceState } from '$app/navigation';
import { page } from '$app/state';

type Heading = { id: string; label: string; level: number; node: HTMLElement };

export function createPageOutline(getContent: () => HTMLElement | undefined) {
    let headings = $state<Heading[]>([]);
    let active = $state('');
    let reached = $state(false);
    const trail = $derived.by(() => {
        const index = headings.findIndex((heading) => heading.id === active);
        if (!reached || index === -1) {
            return [];
        }
        const current = headings[index];
        if (current.level === 2) {
            return [current];
        }
        const parent = headings.slice(0, index).findLast((heading) => heading.level === 2);

        return parent ? [parent, current] : [current];
    });
    let destination: string | null = null;
    let jumpVersion = 0;
    let jumpStarted = false;
    function headingTop(heading: Heading) {
        const section = heading.node.closest<HTMLElement>('section');
        const anchor = heading.level === 2 && section ? section : heading.node;

        return anchor.getBoundingClientRect().top;
    }

    function headingInset() {
        const toolbar = getContent()?.querySelector<HTMLElement>('[data-docs-toolbar]');

        return toolbar?.getBoundingClientRect().height ?? 0;
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
            headingInset();
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
            let passed = false;
            for (const heading of headings) {
                if (headingTop(heading) <= top + headingInset()) {
                    current = heading.id;
                    passed = true;
                }
            }
            reached = passed;
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
                (node) =>
                    !node.closest('[data-component-preview]') && !node.classList.contains('sr-only')
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

    return {
        get headings() {
            return headings;
        },
        get active() {
            return active;
        },
        /**
         * The section the reader is in, and the subsection under it when there is one. Empty
         * until the first heading has scrolled to the top.
         */
        get trail() {
            return trail;
        },
        navigate
    };
}

export type PageOutline = ReturnType<typeof createPageOutline>;
