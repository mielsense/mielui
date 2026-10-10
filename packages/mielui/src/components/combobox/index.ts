import type { PopoverProps, PopoverTriggerProps } from '@mielui/svelte/components/popover';
import type { Snippet } from 'svelte';
import Root from './combobox.svelte';
import Content from './combobox-content.svelte';
import Item from './combobox-item.svelte';
import Label from './combobox-label.svelte';
import Results from './combobox-results.svelte';
import Trigger from './combobox-trigger.svelte';

export type ComboboxItem = {
    id: string;
    value: string;
    label: string;
    callback?: () => void;
    ref: HTMLButtonElement | HTMLAnchorElement | undefined;
};

export type ComboboxState = {
    open: boolean;
    items: Set<ComboboxItem>;
    results: Set<ComboboxItem>;
    searchContent: string;
    searchPlacement: 'trigger' | 'menu';
    threshold: number;
    appearance: 'button' | 'input';
    activeValue?: string;
    selected?: ComboboxItem;
};

export type ComboboxLabels = {
    searchPlaceholder?: string;
    search?: string;
    clear?: string;
    options?: string;
    empty?: string;
};

export type ComboboxRootProps = PopoverProps & {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: ComboboxLabels;
} & (
        | {
              /** `single` keeps one value. `multiple` allows several and makes `value` an array. */
              type?: 'single';
              /** Selected value, or an array in multiple mode. Bindable. */
              value?: string;
              /** Called with the new value when it changes. */
              onValueChange?: (value: string) => void;
          }
        | {
              /** `single` keeps one value. `multiple` allows several and makes `value` an array. */
              type: 'multiple';
              /** Selected value, or an array in multiple mode. Bindable. */
              value?: string[];
              /** Called with the new value when it changes. */
              onValueChange?: (value: string[]) => void;
          }
    );

export type ComboboxTriggerProps = Omit<
    PopoverTriggerProps,
    'children' | 'element' | 'value' | 'type'
> & {
    /** Id of the element that names the control, such as a visible label. */
    'aria-labelledby'?: string;
    /** Content at the end of the trigger. */
    trailing?: Snippet;
    /** Text shown while there is no value. */
    placeholder?: string;
    /** `trigger` types into the trigger. `menu` puts a search field inside the menu. */
    searchPlacement?: 'trigger' | 'menu';
    /** How loosely typed text may match, from 0 for exact to 1 for anything. */
    threshold?: number;
    /** `button` looks like a select. `input` looks like a text field. */
    appearance?: 'button' | 'input';
    /** Bindable reference to the DOM element. */
    element?: HTMLInputElement | HTMLButtonElement;
};

export { Content, Item, Label, Results, Root, Trigger };
