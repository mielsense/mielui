import { getCssDuration } from '@mielui/svelte/transition';

export function magneticHeadings(selector: string) {
    return (node: HTMLElement) => {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        let timer: ReturnType<typeof setTimeout> | undefined;
        let holding = false;
        let pendingGesture = false;
        let lastPosition = node.scrollTop;

        function settle() {
            clearTimeout(timer);
            if (
                !pendingGesture ||
                holding ||
                preference.matches ||
                getCssDuration(node, '--motion-duration-panel', 180) === 0
            ) {
                return;
            }
            pendingGesture = false;
            const viewport = node.getBoundingClientRect();
            const toolbar = node.querySelector<HTMLElement>('[data-docs-toolbar]');
            const inset = toolbar?.getBoundingClientRect().height ?? 0;
            const sections = Array.from(node.querySelectorAll(selector), (section) =>
                section.getBoundingClientRect()
            );
            for (let index = 0; index < sections.length; index += 1) {
                const section = sections[index];
                const previous = sections[index - 1];
                const catchDistance = Math.min(
                    160,
                    node.clientHeight * 0.2,
                    section.height * 0.5,
                    (previous?.height ?? section.height) * 0.5
                );
                const offset = section.top - viewport.top - inset;
                if (offset > 1 && offset <= catchDistance) {
                    node.scrollBy({ top: offset, behavior: 'smooth' });
                    break;
                }
            }
        }

        function schedule() {
            if (holding) {
                pendingGesture = node.scrollTop > lastPosition;
            }
            lastPosition = node.scrollTop;
            clearTimeout(timer);
            timer = setTimeout(settle, 180);
        }

        function wheel(event: WheelEvent) {
            pendingGesture = event.deltaY > 0 && Math.abs(event.deltaY) >= Math.abs(event.deltaX);
        }

        function keyboard(event: KeyboardEvent) {
            if (['ArrowDown', 'PageDown', 'End', ' '].includes(event.key)) {
                pendingGesture = !event.shiftKey;
            } else if (['ArrowUp', 'PageUp', 'Home'].includes(event.key)) {
                pendingGesture = false;
            }
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

        node.addEventListener('wheel', wheel, { passive: true });
        node.addEventListener('keydown', keyboard);
        node.addEventListener('scrollend', settle);
        node.addEventListener('scroll', schedule, { passive: true });
        node.addEventListener('pointerdown', hold);
        window.addEventListener('pointerup', release);
        window.addEventListener('pointercancel', release);
        return () => {
            clearTimeout(timer);
            node.removeEventListener('wheel', wheel);
            node.removeEventListener('keydown', keyboard);
            node.removeEventListener('scrollend', settle);
            node.removeEventListener('scroll', schedule);
            node.removeEventListener('pointerdown', hold);
            window.removeEventListener('pointerup', release);
            window.removeEventListener('pointercancel', release);
        };
    };
}
