type MeasureOptions = {
    readonly element: HTMLDivElement | undefined;
};

export function createScrollAreaMeasure(options: MeasureOptions) {
    let scrollTop = $state(0);
    let scrollHeight = $state(0);
    let clientHeight = $state(0);
    let scrollWidth = $state(0);
    let clientWidth = $state(0);
    let scrolling = $state(false);
    let scrollTimer: ReturnType<typeof setTimeout> | undefined;

    const atTop = $derived(scrollTop <= 1);
    const atBottom = $derived(scrollTop + clientHeight >= scrollHeight - 1);
    const overflows = $derived(scrollHeight - clientHeight > 1);
    const overflowsInline = $derived(scrollWidth - clientWidth > 1);

    function markScrolling() {
        scrolling = true;
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            scrolling = false;
        }, 800);
    }

    function measure() {
        const element = options.element;

        if (!element) {
            return;
        }

        scrollTop = element.scrollTop;
        scrollHeight = element.scrollHeight;
        clientHeight = element.clientHeight;
        scrollWidth = element.scrollWidth;
        clientWidth = element.clientWidth;
    }

    $effect(() => {
        const viewport = options.element;

        if (!viewport) {
            return;
        }

        const observed = new Set<Element>();
        const resizeObserver = new ResizeObserver(measure);

        resizeObserver.observe(viewport);

        const syncChildren = () => {
            for (const child of observed) {
                if (child.parentElement !== viewport) {
                    resizeObserver.unobserve(child);
                    observed.delete(child);
                }
            }

            for (const child of Array.from(viewport.children)) {
                if (!observed.has(child)) {
                    observed.add(child);
                    resizeObserver.observe(child);
                }
            }

            measure();
        };

        const mutationObserver = new MutationObserver(syncChildren);

        mutationObserver.observe(viewport, { childList: true, subtree: true, characterData: true });
        syncChildren();

        return () => {
            clearTimeout(scrollTimer);
            mutationObserver.disconnect();
            resizeObserver.disconnect();
        };
    });

    return {
        get atTop() {
            return atTop;
        },
        get atBottom() {
            return atBottom;
        },
        get overflows() {
            return overflows;
        },
        get overflowsInline() {
            return overflowsInline;
        },
        get scrolling() {
            return scrolling;
        },
        measure,
        markScrolling
    };
}
