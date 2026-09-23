import { getCssDuration } from '@mielui/svelte/transition';

export function magneticHeadings(selector: string) {
    return (node: HTMLElement) => {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        let timer: ReturnType<typeof setTimeout> | undefined;
        let holding = false;

        function settle() {
            clearTimeout(timer);
            if (
                holding ||
                preference.matches ||
                getCssDuration(node, '--motion-duration-panel', 180) === 0
            ) {
                return;
            }
            const viewport = node.getBoundingClientRect();
            const toolbar = node.querySelector<HTMLElement>('[data-docs-toolbar]');
            const inset = toolbar?.getBoundingClientRect().height ?? 0;
            const catchDistance = Math.min(160, node.clientHeight * 0.2);
            const offsets = Array.from(
                node.querySelectorAll(selector),
                (section) => section.getBoundingClientRect().top - viewport.top - inset
            );
            const offset = offsets.find((distance) => distance > 1 && distance <= catchDistance);
            if (offset !== undefined) {
                node.scrollBy({ top: offset, behavior: 'smooth' });
            }
        }

        function schedule() {
            clearTimeout(timer);
            timer = setTimeout(settle, 180);
        }

        function hold() {
            holding = true;
            clearTimeout(timer);
        }

        function release() {
            if (!holding) {
                return;
            }
            holding = false;
            schedule();
        }

        node.addEventListener('scrollend', settle);
        node.addEventListener('scroll', schedule, { passive: true });
        node.addEventListener('pointerdown', hold);
        window.addEventListener('pointerup', release);
        window.addEventListener('pointercancel', release);
        return () => {
            clearTimeout(timer);
            node.removeEventListener('scrollend', settle);
            node.removeEventListener('scroll', schedule);
            node.removeEventListener('pointerdown', hold);
            window.removeEventListener('pointerup', release);
            window.removeEventListener('pointercancel', release);
        };
    };
}
