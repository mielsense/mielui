type RadioBinding = {
    readonly checked: boolean | undefined;
    readonly update: (checked: boolean) => void;
};

const bindings = new Map<HTMLInputElement, RadioBinding>();

function sameGroup(left: HTMLInputElement, right: HTMLInputElement) {
    return (
        left === right ||
        (left.name !== '' &&
            left.name === right.name &&
            left.form === right.form &&
            left.getRootNode() === right.getRootNode())
    );
}

function syncGroup(node: HTMLInputElement) {
    for (const [radio, binding] of bindings) {
        if (sameGroup(node, radio)) {
            binding.update(radio.checked);
        }
    }
}

export function radioChecked(node: HTMLInputElement, binding: RadioBinding) {
    const root = node.getRootNode();
    let alive = true;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    bindings.set(node, binding);

    function syncAfterRender() {
        queueMicrotask(() => {
            if (alive) {
                syncGroup(node);
            }
        });
    }

    function handleChange(event: Event) {
        const target = event.composedPath()[0];
        if (
            target instanceof HTMLInputElement &&
            target.type === 'radio' &&
            sameGroup(node, target)
        ) {
            syncGroup(node);
        }
    }

    function handleReset(event: Event) {
        if (event.target !== node.form) {
            return;
        }
        if (resetTimer !== undefined) {
            clearTimeout(resetTimer);
        }
        resetTimer = setTimeout(() => {
            resetTimer = undefined;
            if (alive && !event.defaultPrevented) {
                syncGroup(node);
            }
        }, 0);
    }

    root.addEventListener('input', handleChange, true);
    root.addEventListener('change', handleChange, true);
    root.addEventListener('reset', handleReset, true);
    syncAfterRender();

    return {
        update(next: RadioBinding) {
            bindings.set(node, next);
            syncAfterRender();
        },
        destroy() {
            alive = false;
            if (resetTimer !== undefined) {
                clearTimeout(resetTimer);
            }
            bindings.delete(node);
            root.removeEventListener('input', handleChange, true);
            root.removeEventListener('change', handleChange, true);
            root.removeEventListener('reset', handleReset, true);
        }
    };
}
