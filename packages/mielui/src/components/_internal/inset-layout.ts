const strips =
    '[data-ui="card-footer"], [data-ui="code-block-header"], [data-ui="file-diff-top-bar"], [data-ui="toast-footer"], [data-ui="dialog-frame-header"], [data-ui="dialog-footer"], [data-ui="composer-toolbar"][data-variant="chrome"], [data-ui="table-footer"]';

export function insetLayout(node: HTMLElement, enabled = true) {
    const markers = new Map<Element, Comment>();
    let frame = 0;
    let disposed = false;

    function restore() {
        for (const [element, marker] of markers) {
            if (element.parentElement === node && marker.parentNode === node) {
                node.insertBefore(element, marker);
                element.removeAttribute('data-inset-position');
            }
            marker.remove();
        }
        markers.clear();
    }

    function synchronize() {
        frame = 0;
        if (disposed || !enabled) {
            return;
        }
        const position = getComputedStyle(node).getPropertyValue('--mielui-inset-position').trim();
        if (position !== 'top' && position !== 'bottom') {
            if (markers.size) {
                restore();
            }
            return;
        }
        for (const element of node.children) {
            if (element.matches(strips) && !markers.has(element)) {
                const marker = document.createComment('inset strip');
                node.insertBefore(marker, element);
                markers.set(element, marker);
            }
        }
        for (const [element, marker] of markers) {
            if (element.parentElement !== node) {
                marker.remove();
                markers.delete(element);
            }
        }
        const ordered = [...markers.keys()].sort((a, b) => {
            const first = markers.get(a);
            const second = markers.get(b);
            return first &&
                second &&
                first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING
                ? -1
                : 1;
        });
        const body = [...node.children].filter((element) => !markers.has(element));
        const children = position === 'top' ? [...ordered, ...body] : [...body, ...ordered];
        const focused = document.activeElement;
        let next: Element | null = null;
        for (const element of children.reverse()) {
            if (element.nextElementSibling !== next) {
                node.insertBefore(element, next);
            }
            next = element;
        }
        for (const element of ordered) {
            element.setAttribute('data-inset-position', position);
        }
        if (
            focused instanceof HTMLElement &&
            node.contains(focused) &&
            document.activeElement !== focused
        ) {
            focused.focus({ preventScroll: true });
        }
    }

    function schedule() {
        if (!frame && !disposed) {
            frame = requestAnimationFrame(synchronize);
        }
    }

    const observer = new MutationObserver(schedule);
    observer.observe(node, { childList: true });
    let ancestor: HTMLElement | null = node;
    while (ancestor) {
        observer.observe(ancestor, { attributes: true, attributeFilter: ['class', 'style'] });
        ancestor = ancestor.parentElement;
    }
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    schedule();

    return {
        update(next: boolean) {
            enabled = next;
            if (!enabled) {
                restore();
            }
            schedule();
        },
        destroy() {
            disposed = true;
            cancelAnimationFrame(frame);
            observer.disconnect();
            restore();
        }
    };
}
