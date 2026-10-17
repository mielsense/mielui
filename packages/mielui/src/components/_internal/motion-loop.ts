import { getCssDuration } from '@mielui/svelte/transition';
import { observeThemeChanges } from './theme-changes';

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

    const stopThemeChanges = observeThemeChanges(node, refresh);
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
        stopThemeChanges();
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
