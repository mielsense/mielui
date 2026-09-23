import { getContext } from 'svelte';

export type AccordionItemContext = {
    readonly id: string;
    readonly value: string;
    readonly disabled: boolean;
    trigger: (() => string) | undefined;
    content: (() => string) | undefined;
};

export function getAccordionItemContext() {
    return getContext<AccordionItemContext>('accordion-item');
}
