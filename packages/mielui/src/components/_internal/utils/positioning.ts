import {
    computePosition,
    flip,
    offset,
    type Placement,
    type ReferenceElement,
    shift,
    size
} from '@floating-ui/dom';

function pointInTriangle(
    point: { x: number; y: number },
    a: { x: number; y: number },
    b: { x: number; y: number },
    c: { x: number; y: number }
) {
    const sign = (p1: typeof point, p2: typeof point, p3: typeof point) =>
        (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    const first = sign(point, a, b);
    const second = sign(point, b, c);
    const third = sign(point, c, a);
    const hasNegative = first < 0 || second < 0 || third < 0;
    const hasPositive = first > 0 || second > 0 || third > 0;

    return !(hasNegative && hasPositive);
}

function pointInRect(point: { x: number; y: number }, rect: DOMRect) {
    return (
        point.x >= rect.left &&
        point.x <= rect.right &&
        point.y >= rect.top &&
        point.y <= rect.bottom
    );
}

/** Whether a pointer is in the contact triangle between a floating trigger and panel. */
export function isPointInSubmenuTriangle(
    point: { x: number; y: number },
    trigger: DOMRect,
    panel: DOMRect,
    placement: Placement
) {
    if (pointInRect(point, trigger) || pointInRect(point, panel)) {
        return true;
    }

    const contactMargin = 8;
    const triggerCenter = {
        x: (trigger.left + trigger.right) / 2,
        y: (trigger.top + trigger.bottom) / 2
    };

    switch (placement.split('-')[0]) {
        case 'left':
            return pointInTriangle(
                point,
                { x: trigger.left - contactMargin, y: triggerCenter.y },
                { x: panel.right + contactMargin, y: panel.top },
                { x: panel.right + contactMargin, y: panel.bottom }
            );
        case 'top':
            return pointInTriangle(
                point,
                { x: triggerCenter.x, y: trigger.top - contactMargin },
                { x: panel.left, y: panel.bottom + contactMargin },
                { x: panel.right, y: panel.bottom + contactMargin }
            );
        case 'bottom':
            return pointInTriangle(
                point,
                { x: triggerCenter.x, y: trigger.bottom + contactMargin },
                { x: panel.left, y: panel.top - contactMargin },
                { x: panel.right, y: panel.top - contactMargin }
            );
        default:
            return pointInTriangle(
                point,
                { x: trigger.right + contactMargin, y: triggerCenter.y },
                { x: panel.left - contactMargin, y: panel.top },
                { x: panel.left - contactMargin, y: panel.bottom }
            );
    }
}

export function submenuPanelOffset(placement: Placement, hoverable: boolean) {
    if (!hoverable) {
        return 8;
    }

    const side = placement.split('-')[0];
    if (side === 'left' || side === 'right') {
        return -2;
    }

    return 8;
}

/**
 * Positions a floating panel while keeping it inside the viewport bounds.
 *
 * Rejections are swallowed: Floating UI rejects when either element is removed
 * during an asynchronous layout pass, and teardown is an expected terminal
 * state rather than an error.
 */
export function positionFloatingPanel(
    reference: ReferenceElement,
    floating: HTMLElement,
    placement: Placement,
    offsetPx = 8
) {
    floating.dataset.placement ??= placement;
    return computePosition(reference, floating, {
        strategy: 'fixed',
        placement,
        middleware: [
            offset(offsetPx),
            flip({ padding: 8, fallbackAxisSideDirection: 'end', fallbackStrategy: 'bestFit' }),
            shift({ padding: 8, crossAxis: true }),
            size({
                padding: 8,
                apply({ availableWidth, availableHeight, elements }) {
                    elements.floating.style.maxWidth = `${Math.max(availableWidth, 0)}px`;
                    elements.floating.style.maxHeight = `${Math.max(availableHeight, 0)}px`;
                    elements.floating.style.setProperty(
                        '--popover-available-width',
                        `${Math.max(availableWidth, 0)}px`
                    );
                    elements.floating.style.setProperty(
                        '--popover-available-height',
                        `${Math.max(availableHeight, 0)}px`
                    );
                }
            })
        ]
    })
        .then(({ x, y, placement: resolvedPlacement }) => {
            Object.assign(floating.style, {
                left: `${x}px`,
                top: `${y}px`
            });
            floating.dataset.placement = resolvedPlacement;
        })
        .catch(() => {});
}
