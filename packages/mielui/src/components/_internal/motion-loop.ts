import { getCssDuration } from '@mielui/svelte/transition';

export function motionLoop(node: HTMLElement) {
    const property = '--mielui-loop-play-state';
    const original = node.style.getPropertyValue(property);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;

    function refresh() {
        const paused =
            !visible ||
            document.hidden ||
            preference.matches ||
            getCssDuration(node, '--motion-duration-panel', 180) === 0;
        const next = paused ? 'paused' : 'running';
        if (node.style.getPropertyValue(property) !== next) {
            node.style.setProperty(property, next);
        }
    }

    const theme = new MutationObserver(refresh);
    for (let ancestor: HTMLElement | null = node; ancestor; ancestor = ancestor.parentElement) {
        theme.observe(ancestor, { attributes: true, attributeFilter: ['style', 'class'] });
    }
    const visibility =
        typeof IntersectionObserver === 'undefined'
            ? undefined
            : new IntersectionObserver((entries) => {
                  visible = entries.some((entry) => entry.isIntersecting);
                  refresh();
              });
    visibility?.observe(node);
    preference.addEventListener('change', refresh);
    document.addEventListener('visibilitychange', refresh);
    refresh();

    return () => {
        theme.disconnect();
        visibility?.disconnect();
        preference.removeEventListener('change', refresh);
        document.removeEventListener('visibilitychange', refresh);
        if (original) {
            node.style.setProperty(property, original);
        } else {
            node.style.removeProperty(property);
        }
    };
}
