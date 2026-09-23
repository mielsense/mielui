<script lang="ts">
    type Intersection = {
        section: HTMLElement;
        top: number;
    };

    let {
        content,
        viewport
    }: {
        content: HTMLElement | undefined;
        viewport: HTMLElement | undefined;
    } = $props();

    let intersections = $state<Intersection[]>([]);
    let edges = $state({ left: 0, right: 0, showLeft: false, showRight: false });

    $effect(() => {
        if (!content || !viewport) {
            return;
        }

        const article = content;
        const scrollport = viewport;
        const inset = 5;
        let frame = 0;
        let sections: HTMLElement[] = [];

        function measure() {
            frame = 0;
            const bounds = scrollport.getBoundingClientRect();
            const column = article.getBoundingClientRect();
            const positions = new Set<number>();

            edges = {
                left: column.left,
                right: column.right,
                showLeft: column.left >= inset,
                showRight: column.right <= window.innerWidth - inset
            };

            intersections = sections.flatMap((section) => {
                if (Number.parseFloat(getComputedStyle(section).borderTopWidth) === 0) {
                    return [];
                }

                const top = section.getBoundingClientRect().top;
                const roundedTop = Math.round(top);
                if (
                    top < bounds.top + inset ||
                    top > bounds.bottom - inset ||
                    positions.has(roundedTop)
                ) {
                    return [];
                }

                positions.add(roundedTop);
                return [{ section, top }];
            });
        }

        function scheduleMeasure() {
            if (!frame) {
                frame = requestAnimationFrame(measure);
            }
        }

        const resizeObserver = new ResizeObserver(scheduleMeasure);

        function observeSections() {
            resizeObserver.disconnect();
            resizeObserver.observe(article);
            resizeObserver.observe(scrollport);
            sections = Array.from(
                article.querySelectorAll<HTMLElement>(
                    '[data-docs-page] > section:not(#hero), #api-reference'
                )
            );
            for (const section of sections) {
                resizeObserver.observe(section);
            }
            scheduleMeasure();
        }

        const mutationObserver = new MutationObserver(observeSections);
        mutationObserver.observe(article, { childList: true, subtree: true });
        scrollport.addEventListener('scroll', scheduleMeasure, { passive: true });
        window.addEventListener('resize', scheduleMeasure, { passive: true });
        observeSections();

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            mutationObserver.disconnect();
            scrollport.removeEventListener('scroll', scheduleMeasure);
            window.removeEventListener('resize', scheduleMeasure);
        };
    });
</script>

<div aria-hidden="true" class="pointer-events-none fixed inset-0 z-40">
    {#each intersections as intersection (intersection.section)}
        {#if edges.showLeft}
            <span
                data-section-intersection="left"
                class="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-[var(--docs-rule)] bg-[var(--docs-chrome)]"
                style:left={`${edges.left}px`}
                style:top={`${intersection.top}px`}
            ></span>
        {/if}
        {#if edges.showRight}
            <span
                data-section-intersection="right"
                class="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-[var(--docs-rule)] bg-[var(--docs-chrome)]"
                style:left={`${edges.right}px`}
                style:top={`${intersection.top}px`}
            ></span>
        {/if}
    {/each}
</div>
