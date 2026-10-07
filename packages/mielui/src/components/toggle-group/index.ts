import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import Root from './toggle-group.svelte';
import Item from './toggle-group-item.svelte';

export type ToggleGroupSize = 'sm' | 'md' | 'lg';

export type ToggleGroupProps = DefaultProps & {
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Control height of the items. */
    size?: ToggleGroupSize;
    /** Accessible name when there is no visible label. */
    'aria-label'?: string;
    /** Id of the element that labels it. */
    'aria-labelledby'?: string;
} & (
        | {
              /** `single` keeps one value. `multiple` allows several and makes `value` an array. */
              type?: 'single';
              /** Selected value, or an array in multiple mode. Bindable. */
              value?: string;
              /** Called with the new value when it changes. */
              onValueChange?: (value: string | undefined) => void;
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

export type ToggleGroupItemProps = {
    /** Value this item selects. */
    value: string;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps &
    Omit<HTMLButtonAttributes, 'onclick' | 'children' | 'disabled' | 'value'>;

export type ToggleGroupContext = {
    readonly disabled: boolean;
    readonly size: ToggleGroupSize;
    readonly type: 'single' | 'multiple';
    isActive: (value: string) => boolean;
    setValue: (value: string) => void;
};

export { Item, Root };
