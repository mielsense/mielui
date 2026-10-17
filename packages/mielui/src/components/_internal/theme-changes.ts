/**
 * Calls `onChange` when a class or style attribute changes on `start` or any of its
 * ancestors, which is how themes and Theme Studio swap tokens at runtime.
 * Returns the cleanup.
 */
export function observeThemeChanges(start: Element | null, onChange: () => void) {
    const observer = new MutationObserver(onChange);
    for (let ancestor = start; ancestor; ancestor = ancestor.parentElement) {
        observer.observe(ancestor, { attributes: true, attributeFilter: ['class', 'style'] });
    }

    return () => {
        observer.disconnect();
    };
}
