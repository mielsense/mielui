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

export function live(element: SVGElement, chart: ChartContext, offset = 0) {
    if (!chart.motion || chart.animation !== 'live') {
        return;
    }
    return observeAnimation(
        element,
        element.animate(
            [{ strokeDashoffset: String(offset) }, { strokeDashoffset: String(offset - 100) }],
            {
                duration: 4200 * chart.motionScale,
                iterations: Infinity,
                easing: 'linear'
            }
        )
    );
}

export function sweep(element: SVGElement, chart: ChartContext) {
    if (!chart.motion || chart.animation !== 'live') {
        return;
    }
    return observeAnimation(
        element,
        element.animate(
            [
                { transform: 'translateX(-110%)', offset: 0 },
                { transform: 'translateX(110%)', offset: 0.65 },
                { transform: 'translateX(110%)', offset: 1 }
            ],
            {
                duration: 4200 * chart.motionScale,
                iterations: Infinity,
                easing: 'cubic-bezier(.4,0,.2,1)'
            }
        )
    );
}

function observeAnimation(element: SVGElement, animation: Animation) {
    let visible = false;
    function update() {
        if (visible && !document.hidden) {
            animation.play();
        } else {
            animation.pause();
        }
    }
    const observer = new IntersectionObserver((entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        update();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {
        animation.cancel();
        observer.disconnect();
        document.removeEventListener('visibilitychange', update);
    };
}
