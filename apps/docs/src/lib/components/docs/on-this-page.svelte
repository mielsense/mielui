<script lang="ts">
    import { tick } from 'svelte';
    import { prefersReducedMotion } from 'svelte/motion';
    import { replaceState } from '$app/navigation';
    import { page } from '$app/state';
    import RailHeading from './rail-heading.svelte';
    import TocRail from './toc-rail.svelte';

    type Heading = { id: string; label: string; level: number; node: HTMLElement };
    let { content }: { content: HTMLElement | undefined } = $props();
    let headings = $state<Heading[]>([]);
    let active = $state('');
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
        if (heading.level !== 3) {
            return 0;
        }
        const section = heading.node.closest('section');
        const title = section?.querySelector<HTMLElement>(
            ':scope > h2, :scope > div:first-child:has(> h2)'
        );
        return title?.getBoundingClientRect().height ?? 0;
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
        const scroll = content?.closest<HTMLElement>('[data-docs-scroll]');
        if (!scroll) {
            return;
        }
        event.preventDefault();
        for (const preview of content?.querySelectorAll('[data-component-preview]') ?? []) {
            if (preview.compareDocumentPosition(heading.node) & Node.DOCUMENT_POSITION_FOLLOWING) {
                preview.dispatchEvent(new Event('docs-activate-preview'));
            }
        }
        await tick();
        await new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        );
        if (!heading.node.isConnected || !scroll.isConnected) {
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
        scroll.scrollTo({ top, behavior: prefersReducedMotion.current ? 'instant' : 'smooth' });
    }

    $effect(() => {
        page.url.pathname;
        const root = content;
        if (!root) {
            return;
        }
        const scroll = root.closest<HTMLElement>('[data-docs-scroll]');
        let frame = 0;
        let disposed = false;
        function updateActive() {
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
        const observer = new MutationObserver(schedule);
        observer.observe(root, { childList: true, subtree: true });
        const resize = new ResizeObserver(schedule);
        resize.observe(root);
        scroll?.addEventListener('scroll', updateActive, { passive: true });
        void tick().then(collect);
        return () => {
            disposed = true;
            cancelAnimationFrame(frame);
            observer.disconnect();
            resize.disconnect();
            scroll?.removeEventListener('scroll', updateActive);
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
</script>

{#if headings.length}
    <nav aria-label="On this page" class="min-h-full pb-6">
        <RailHeading title="On this page" />
        <div class="px-3 py-3">
            <div bind:this={list} class="relative flex flex-col gap-0.5">
                <TocRail y={previewY} from={previewFrom} muted />
                <TocRail y={activeY} />
                {#each headings as heading (heading.id)}
                    <a
                        href={`#${heading.id}`}
                        data-heading={heading.id}
                        onclick={(event) => navigate(event, heading)}
                        aria-current={active === heading.id ? 'location' : undefined}
                        onmouseenter={() => { hovered = heading.id; }}
                        onmouseleave={() => { hovered = null; }}
                        onfocus={() => { focused = heading.id; }}
                        onblur={() => { focused = null; }}
                        class={`${heading.id === 'api-reference' ? 'mt-2' : ''} relative rounded-md py-1.5 pr-1 text-sm leading-5 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-primary ${heading.level === 3 ? 'pl-6' : 'pl-3'} ${active === heading.id ? 'text-foreground' : 'text-foreground-muted hover:text-foreground'}`}
                    >
                        {heading.label}
                    </a>
                {/each}
            </div>
        </div>
    </nav>
{/if}
