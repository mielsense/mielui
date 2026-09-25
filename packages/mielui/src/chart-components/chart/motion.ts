import type { ChartContext } from './context.svelte';

export function reveal(element: SVGElement, chart: ChartContext, kind: 'bar' | 'line') {
    if (!chart.motion || chart.animation === 'none') {
        return;
    }
    const animation =
        kind === 'line'
            ? element.animate(
                  [
                      { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
                      { opacity: 1, clipPath: 'inset(0 0% 0 0)' }
                  ],
                  { duration: 500 * chart.motionScale, easing: 'cubic-bezier(.2,.8,.2,1)' }
              )
            : element.animate(
                  [
                      {
                          opacity: 0,
                          transform: chart.orientation === 'horizontal' ? 'scaleX(0)' : 'scaleY(0)'
                      },
                      { opacity: 1, transform: 'scale(1)' }
                  ],
                  { duration: 500 * chart.motionScale, easing: 'cubic-bezier(.2,.8,.2,1)' }
              );
    return () => {
        animation.cancel();
    };
}

export function live(element: SVGElement, chart: ChartContext) {
    if (!chart.motion || chart.animation !== 'live' || chart.active !== null) {
        return;
    }
    return observeAnimation(
        element,
        element.animate(
            [
                { strokeDashoffset: 12, opacity: 0, offset: 0 },
                { strokeDashoffset: 0, opacity: 0.18, offset: 0.1 },
                { strokeDashoffset: -88, opacity: 0.18, offset: 0.4 },
                { strokeDashoffset: -100, opacity: 0, offset: 0.48 },
                { strokeDashoffset: -100, opacity: 0, offset: 1 }
            ],
            { duration: 7600 * chart.motionScale, iterations: Infinity, easing: 'linear' }
        )
    );
}

export function sweep(element: SVGElement, chart: ChartContext, phase = 0, area = false) {
    if (!chart.motion || chart.animation !== 'live' || chart.active !== null) {
        return;
    }
    const horizontal = chart.orientation === 'horizontal';
    const axis = area ? (horizontal ? 'Y' : 'X') : horizontal ? 'X' : 'Y';
    const direction = !area && !horizontal ? -1 : 1;
    const start = `translate${axis}(${-110 * direction}%)`;
    const end = `translate${axis}(${110 * direction}%)`;
    const delay = Math.max(0, Math.min(1, phase)) * 0.16;
    return observeAnimation(
        element,
        element.animate(
            [
                { transform: start, opacity: 0, offset: 0 },
                { transform: start, opacity: 0, offset: delay },
                { transform: start, opacity: 1, offset: delay + 0.03 },
                { transform: end, opacity: 1, offset: delay + 0.32 },
                { transform: end, opacity: 0, offset: delay + 0.323 },
                { transform: end, opacity: 0, offset: 1 }
            ],
            { duration: 7200 * chart.motionScale, iterations: Infinity, easing: 'linear' }
        )
    );
}

type ViewportMotion = {
    animations: Set<Animation>;
    visible: boolean;
    update: () => void;
    observer: IntersectionObserver;
};

const viewports = new WeakMap<Element, ViewportMotion>();

function observeAnimation(element: SVGElement, animation: Animation) {
    const viewport = element.ownerSVGElement ?? element;
    let state = viewports.get(viewport);
    if (!state) {
        const animations = new Set<Animation>();
        const created: ViewportMotion = {
            animations,
            visible: false,
            update() {
                for (const current of animations) {
                    if (created.visible && !document.hidden) {
                        current.play();
                    } else {
                        current.pause();
                    }
                }
            },
            observer: new IntersectionObserver(([entry]) => {
                created.visible = entry?.isIntersecting ?? false;
                created.update();
            })
        };
        state = created;
        viewports.set(viewport, state);
        state.observer.observe(viewport);
        document.addEventListener('visibilitychange', state.update);
    }
    const current = state;
    current.animations.add(animation);
    current.update();
    return () => {
        animation.cancel();
        current.animations.delete(animation);
        if (current.animations.size === 0) {
            current.observer.disconnect();
            document.removeEventListener('visibilitychange', current.update);
            viewports.delete(viewport);
        }
    };
}
