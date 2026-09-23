export function connectFieldMetadata(control: HTMLElement) {
    const root = control.closest<HTMLElement>('[data-ui="field"]');
    if (!root) {
        return;
    }
    let owned: string[] = [];

    function writeDescription(ids: string[]) {
        const value = ids.length ? ids.join(' ') : null;
        if (control.getAttribute('aria-describedby') === value) {
            return;
        }
        if (value) {
            control.setAttribute('aria-describedby', value);
        } else {
            control.removeAttribute('aria-describedby');
        }
    }

    function externalIds() {
        return (control.getAttribute('aria-describedby') ?? '')
            .split(/\s+/)
            .filter((id) => id && !owned.includes(id));
    }

    const sync = () => {
        const external = externalIds();
        const metadata = Array.from(
            root.querySelectorAll<HTMLElement>('[data-field-description], [data-field-error]')
        ).filter((node) => {
            return (
                node.closest('[data-ui="field"]') === root &&
                !node.closest('[hidden], [inert], [aria-hidden="true"]') &&
                node.id &&
                node.textContent?.trim()
            );
        });
        owned = metadata.map((node) => node.id);
        writeDescription([...new Set([...external, ...owned])]);
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: [
            'id',
            'hidden',
            'inert',
            'aria-hidden',
            'aria-describedby',
            'data-field-description',
            'data-field-error'
        ]
    });
    return () => {
        observer.disconnect();
        writeDescription(externalIds());
    };
}
