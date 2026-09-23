/**
 * Closes a menu layer and every ancestor above it (full submenu-cone collapse).
 *
 * Shared by context-menu and dropdown-menu, whose state objects differ but
 * both expose `open`.
 */
export function closeMenuLayers(current: { open: boolean }, ancestors: { open: boolean }[]) {
    current.open = false;

    for (const ancestor of ancestors) {
        ancestor.open = false;
    }
}

export { clickOutside, resetClickOutsideForTests } from './overlay-dismiss';
export { pushEscapeLayer, resetEscapeStackForTests } from './overlay-escape';
export { getFocusableElements, trapFocus } from './overlay-focus';
export {
    inertOutside,
    lockBodyBackground,
    lockBodyScroll,
    resetBodyLocksForTests
} from './overlay-locks';
