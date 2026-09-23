import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import Root from './toggle-group.svelte';
import Item from './toggle-group-item.svelte';

export type ToggleGroupProps = DefaultProps & {
    disabled?: boolean;
} & (
        | {
              type?: 'single';
              value?: string;
              onValueChange?: (value: string | undefined) => void;
          }
        | {
              type: 'multiple';
              value?: string[];
              onValueChange?: (value: string[]) => void;
          }
    );

export type ToggleGroupItemProps = {
    value: string;
    disabled?: boolean;
    children?: Snippet;
} & DefaultProps &
    Omit<HTMLButtonAttributes, 'onclick' | 'children' | 'disabled' | 'value'>;

export type ToggleGroupContext = {
    readonly disabled: boolean;
    readonly type: 'single' | 'multiple';
    isActive: (value: string) => boolean;
    setValue: (value: string) => void;
};

export { Item, Root };
