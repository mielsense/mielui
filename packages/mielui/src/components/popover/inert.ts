import { inertOutside } from '@mielui/svelte/utils';

export function inertOutsidePopover(popoverRoot: HTMLElement, triggerRoot?: HTMLElement | null) {
    const roots = triggerRoot ? [popoverRoot, triggerRoot] : [popoverRoot];
    return inertOutside(roots);
}
