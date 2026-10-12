import { createContext } from '@mielui/svelte/utils';
import type { AccordionContext } from '.';

export type AccordionItemContext = {
    readonly id: string;
    readonly value: string;
    readonly disabled: boolean;
    trigger: (() => string) | undefined;
    content: (() => string) | undefined;
};

const { set: setAccordionContext, get: getAccordionContext } =
    createContext<AccordionContext>('accordion');
const { set: setAccordionItemContext, get: getAccordionItemContext } =
    createContext<AccordionItemContext>('accordion-item');

export {
    getAccordionContext,
    getAccordionItemContext,
    setAccordionContext,
    setAccordionItemContext
};
