import { untrack } from 'svelte';
import type { CodeBlockRegistry, CodeBlockTheme } from '.';

type RegistryOptions = {
    getValue: () => string | undefined;
    setValue: (value: string) => void;
    getElement: () => HTMLDivElement | undefined;
    getHighLevel: () => boolean;
    getHighLevelOrder: () => string[];
    getTheme: () => CodeBlockTheme;
};

/** Raw code per tab (Copy reads the active one) plus the active/order tracking behind the directional slide. */
export function createCodeBlockRegistry(options: RegistryOptions) {
    const registry = $state({
        codes: {},
        langs: {},
        active: untrack(() => options.getValue() ?? ''),
        order: [],
        contained: untrack(() => options.getHighLevel()),
        theme: untrack(() => options.getTheme())
    } as CodeBlockRegistry);
    let composedTriggerCount = $state(0);

    $effect(() => {
        registry.active = options.getValue() ?? '';
        registry.contained = options.getHighLevel();
        registry.theme = options.getTheme();
        if (options.getHighLevel()) {
            registry.order = options.getHighLevelOrder();
        }
    });

    $effect(() => {
        if (options.getHighLevel()) {
            return;
        }
        const element = options.getElement();
        if (!element) {
            return;
        }
        const root = element;

        function reconcileOrder() {
            const triggers = Array.from(
                root.querySelectorAll<HTMLButtonElement>('[data-code-block-value]')
            ).filter((trigger) => trigger.closest('[data-ui="code-block"]') === root);
            composedTriggerCount = triggers.length;
            if (triggers.length === 0) {
                if (
                    !registry.order.includes(options.getValue() ?? '') &&
                    registry.order.length > 0
                ) {
                    options.setValue(registry.order[0]);
                }
                return;
            }
            const order = triggers.map((trigger) => trigger.dataset.codeBlockValue ?? '');
            if (
                order.length !== registry.order.length ||
                order.some((entry, index) => entry !== registry.order[index])
            ) {
                registry.order = order;
            }
            const enabled = triggers.filter((trigger) => !trigger.disabled);
            if (!enabled.some((trigger) => trigger.dataset.codeBlockValue === options.getValue())) {
                options.setValue(enabled[0]?.dataset.codeBlockValue ?? '');
            }
        }

        const observer = new MutationObserver(reconcileOrder);
        observer.observe(root, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-code-block-value', 'disabled']
        });
        untrack(reconcileOrder);
        return () => {
            observer.disconnect();
        };
    });

    return {
        registry,
        get composedTriggerCount() {
            return composedTriggerCount;
        }
    };
}
