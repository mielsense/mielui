import { capitalize } from '#lib/text.js';

export type ElementBox = {
    top: number;
    left: number;
    width: number;
    height: number;
    radius: string;
};

function boxOf(element: Element): ElementBox {
    const rect = element.getBoundingClientRect();

    return {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        radius: getComputedStyle(element).borderRadius
    };
}

function pick(target: EventTarget | null) {
    return target instanceof Element ? target.closest('[data-ui]') : null;
}

/** Names a component part and counts how many of it the container shows. */
export function describeElement(element: Element | null, container: HTMLElement | undefined) {
    if (!(element instanceof HTMLElement)) {
        return { name: '', variant: '', count: 0 };
    }
    const ui = element.dataset.ui ?? '';
    const variant = element.dataset.variant ?? '';
    const words = ui.replaceAll('-', ' ');
    const selector = `[data-ui="${ui}"]${variant ? `[data-variant="${variant}"]` : ''}`;

    return {
        name: capitalize(words),
        variant,
        count: container?.querySelectorAll(selector).length ?? 0
    };
}

/**
 * Turns clicks inside a container into a selected component part while it is active, and
 * keeps the hovered and selected parts measured so outlines can follow them.
 */
export function createElementPicker(options: {
    active: () => boolean;
    container: () => HTMLElement | undefined;
    /** Runs each time picking starts, before any element can be picked. */
    onStart: () => void;
    /** Receives the part that was clicked, or null when the click hit none. */
    onPick: (element: Element | null) => void;
    /** Runs when Escape is pressed with nothing selected. */
    onExit: () => void;
}) {
    let hovered = $state<Element | null>(null);
    let selected = $state<Element | null>(null);
    let hoverBox = $state<ElementBox | null>(null);
    let selectedBox = $state<ElementBox | null>(null);

    function select(element: Element | null) {
        selected = element;
    }

    function close() {
        selected = null;
        selectedBox = null;
    }

    $effect(() => {
        const preview = options.active() ? options.container() : undefined;
        if (!preview) {
            hovered = null;
            close();

            return;
        }
        options.onStart();
        let frame = 0;

        function measure() {
            hoverBox = hovered?.isConnected ? boxOf(hovered) : null;
            selectedBox = selected?.isConnected ? boxOf(selected) : null;
            frame = requestAnimationFrame(measure);
        }

        function move(event: PointerEvent) {
            hovered = pick(event.target);
        }

        function leave() {
            hovered = null;
        }

        function block(event: Event) {
            event.preventDefault();
            event.stopPropagation();
        }

        function click(event: MouseEvent) {
            block(event);
            options.onPick(pick(event.target));
        }

        function key(event: KeyboardEvent) {
            if (event.key !== 'Escape') {
                return;
            }
            event.preventDefault();
            if (selected) {
                close();
            } else {
                options.onExit();
            }
        }

        frame = requestAnimationFrame(measure);
        preview.addEventListener('pointermove', move, true);
        preview.addEventListener('pointerleave', leave);
        preview.addEventListener('pointerdown', block, true);
        preview.addEventListener('mousedown', block, true);
        preview.addEventListener('click', click, true);
        window.addEventListener('keydown', key);

        return () => {
            cancelAnimationFrame(frame);
            preview.removeEventListener('pointermove', move, true);
            preview.removeEventListener('pointerleave', leave);
            preview.removeEventListener('pointerdown', block, true);
            preview.removeEventListener('mousedown', block, true);
            preview.removeEventListener('click', click, true);
            window.removeEventListener('keydown', key);
        };
    });

    return {
        select,
        close,
        get hovered() {
            return hovered;
        },
        get selected() {
            return selected;
        },
        get hoverBox() {
            return hoverBox;
        },
        get selectedBox() {
            return selectedBox;
        }
    };
}
