import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import Root from './radio-group.svelte';
import Item from './radio-group-item.svelte';

export type RadioGroupProps = {
    /** Selected value. Bindable. */
    value?: string;
    /** Field name submitted with the form. */
    name?: string;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Called with the new value when it changes. */
    onValueChange?: (value: string) => void;
    /** Accessible name when there is no visible label. */
    'aria-label'?: string;
    /** Id of the element that labels it. */
    'aria-labelledby'?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps;

export type RadioGroupItemProps = {
    /** Value this option selects. */
    value: string;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Visible label linked to the control. */
    label?: string;
    /** Supporting text under the label, announced with the control. */
    description?: string;
    /** Id of the element. */
    id?: string;
} & DefaultProps &
    Omit<HTMLInputAttributes, 'type' | 'value' | 'name' | 'checked'>;

export type RadioGroupContext = {
    readonly name: string | undefined;
    readonly disabled: boolean;
    isSelected: (value: string) => boolean;
    setValue: (value: string) => void;
};

export { Item, Root };
