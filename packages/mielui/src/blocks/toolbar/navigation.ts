const selector = 'button, a[href], input, select, textarea, [tabindex]';

export function toolbarNavigation(node: HTMLDivElement) {
    const originalTabindex = new Map<HTMLElement, string | null>();
    let current: HTMLElement | undefined;

    function items() {
        return Array.from(node.querySelectorAll<HTMLElement>(selector)).filter((item) => {
            return (
                item.closest('[role="toolbar"]') === node &&
                !item.matches(
                    ':disabled, [aria-disabled="true"], input, textarea, select, [contenteditable="true"]'
                ) &&
                !item.closest('[hidden], [inert], [aria-hidden="true"]') &&
                item.getClientRects().length > 0
            );
        });
    }

    function update() {
        const controls = items();
        for (const [item, tabindex] of originalTabindex) {
            if (!node.contains(item)) {
                if (tabindex === null) {
                    item.removeAttribute('tabindex');
                } else {
                    item.setAttribute('tabindex', tabindex);
                }
                originalTabindex.delete(item);
            }
        }
        if (!current || !controls.includes(current)) {
            current = controls[0];
        }
        for (const item of controls) {
            if (!originalTabindex.has(item)) {
                originalTabindex.set(item, item.getAttribute('tabindex'));
            }
            item.tabIndex = item === current ? 0 : -1;
        }
    }

    function onFocus(event: FocusEvent) {
        const target = event.target;
        if (target instanceof HTMLElement && items().includes(target)) {
            current = target;
            update();
        }
    }

    function onKeydown(event: KeyboardEvent) {
        if (
            event.defaultPrevented ||
            event.isComposing ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey
        ) {
            return;
        }
        const target = event.target;
        if (
            !(target instanceof HTMLElement) ||
            target.matches('input, textarea, select, [contenteditable="true"]')
        ) {
            return;
        }
        const controls = items();
        const index = controls.indexOf(target);
        if (index < 0) {
            return;
        }
        const vertical = node.getAttribute('aria-orientation') === 'vertical';
        const rtl = getComputedStyle(node).direction === 'rtl';
        const forward = vertical ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight';
        const backward = vertical ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft';
        let next: HTMLElement | undefined;
        if (event.key === 'Home') {
            next = controls[0];
        } else if (event.key === 'End') {
            next = controls.at(-1);
        } else if (event.key === forward) {
            next = controls[(index + 1) % controls.length];
        } else if (event.key === backward) {
            next = controls[(index - 1 + controls.length) % controls.length];
        }
        if (next) {
            event.preventDefault();
            current = next;
            update();
            next.focus();
        }
    }

    const observer = new MutationObserver(update);
    observer.observe(node, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['disabled', 'hidden', 'inert', 'aria-disabled', 'aria-hidden']
    });
    node.addEventListener('focusin', onFocus);
    node.addEventListener('keydown', onKeydown);
    update();

    return {
        destroy() {
            observer.disconnect();
            node.removeEventListener('focusin', onFocus);
            node.removeEventListener('keydown', onKeydown);
            for (const [item, tabindex] of originalTabindex) {
                if (tabindex === null) {
                    item.removeAttribute('tabindex');
                } else {
                    item.setAttribute('tabindex', tabindex);
                }
            }
        }
    };
}
