import { getCssDuration } from '@mielui/svelte/transition';

function observeCalendar(element: HTMLElement) {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let inspecting = element.matches(':hover') || element.contains(document.activeElement);
    let disposed = false;
    let animations: Animation[] = [];

    function update() {
        const duration = getCssDuration(element, '--motion-duration-panel', 180);
        const enabled = !preference.matches && duration > 0;
        if (!enabled) {
            for (const current of animations) {
                current.cancel();
            }
            animations = [];
            return;
        }
        if (!animations.length) {
            animations = Array.from(
                element.querySelectorAll<HTMLElement>('[data-ui="heatmap-cell"]')
            ).map((cell, index) => {
                const column =
                    Number.parseInt(cell.style.gridColumn, 10) || Math.floor(index / 7) + 1;
                return cell.animate(
                    [
                        { filter: 'brightness(1)' },
                        { filter: 'brightness(1.5)', offset: 0.12 },
                        { filter: 'brightness(1)', offset: 0.3 },
                        { filter: 'brightness(1)' }
                    ],
                    {
                        duration: (4800 * duration) / 180,
                        delay:
                            (column - 1) *
                            Math.min(90, 1800 / Math.max(1, element.childElementCount / 7)),
                        iterations: Infinity,
                        easing: 'ease-in-out'
                    }
                );
            });
        }
        for (const current of animations) {
            current.effect?.updateTiming({ duration: (4800 * duration) / 180 });
            if (visible && !document.hidden && !inspecting) {
                current.play();
            } else {
                current.pause();
            }
        }
    }
    function inspect() {
        inspecting = true;
        update();
    }
    function resume() {
        queueMicrotask(() => {
            if (disposed) {
                return;
            }
            inspecting = element.matches(':hover') || element.contains(document.activeElement);
            update();
        });
    }
    const observer = new IntersectionObserver(([entry]) => {
        visible = entry?.isIntersecting ?? false;
        update();
    });
    const cellObserver = new MutationObserver(() => {
        for (const current of animations) {
            current.cancel();
        }
        animations = [];
        update();
    });
    cellObserver.observe(element, { childList: true, subtree: true });
    const themeObserver = new MutationObserver(update);
    for (let ancestor: HTMLElement | null = element; ancestor; ancestor = ancestor.parentElement) {
        themeObserver.observe(ancestor, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }
    observer.observe(element);
    preference.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    element.addEventListener('pointerenter', inspect);
    element.addEventListener('pointerleave', resume);
    element.addEventListener('focusin', inspect);
    element.addEventListener('focusout', resume);
    return () => {
        disposed = true;
        observer.disconnect();
        themeObserver.disconnect();
        cellObserver.disconnect();
        preference.removeEventListener('change', update);
        document.removeEventListener('visibilitychange', update);
        element.removeEventListener('pointerenter', inspect);
        element.removeEventListener('pointerleave', resume);
        element.removeEventListener('focusin', inspect);
        element.removeEventListener('focusout', resume);
        for (const current of animations) {
            current.cancel();
        }
    };
}

export function liveCalendar(element: HTMLElement, enabled: boolean) {
    let dispose = enabled ? observeCalendar(element) : undefined;
    return {
        update(next: boolean) {
            if (next === enabled) {
                return;
            }
            enabled = next;
            dispose?.();
            dispose = enabled ? observeCalendar(element) : undefined;
        },
        destroy() {
            dispose?.();
        }
    };
}
