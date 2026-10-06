import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import Root from './accordion.svelte';
import Content from './accordion-content.svelte';
import Item from './accordion-item.svelte';
import Trigger from './accordion-trigger.svelte';

export type AccordionProps = DefaultProps & {
    /** In single mode, lets the open item be closed so none is open. */
    collapsible?: boolean;
} & (
        | {
              /** `single` keeps one value. `multiple` allows several and makes `value` an array. */
              type?: 'single';
              /** The open item, or an array of open items in multiple mode. Bindable. */
              value?: string;
              /** Called when the open item or items change. */
              onValueChange?: (value: string | undefined) => void;
          }
        | {
              /** `single` keeps one value. `multiple` allows several and makes `value` an array. */
              type: 'multiple';
              /** The open item, or an array of open items in multiple mode. Bindable. */
              value?: string[];
              /** Called when the open item or items change. */
              onValueChange?: (value: string[]) => void;
          }
    );

export type AccordionItemProps = {
    /** Identifies the item. Root's `value` holds the open item or items. */
    value: string;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps;

export type AccordionTriggerProps = {
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps;

export type AccordionContentProps = {
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps;

export type AccordionContext = {
    isOpen: (value: string) => boolean;
    toggle: (value: string) => void;
};

export { Content, Item, Root, Trigger };
