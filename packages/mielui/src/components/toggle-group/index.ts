import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import Root from './toggle-group.svelte';
import Item from './toggle-group-item.svelte';

export type ToggleGroupSize = 'sm' | 'md' | 'lg';

export type ToggleGroupProps = DefaultProps & {
    disabled?: boolean;
    size?: ToggleGroupSize;
    'aria-label'?: string;
    'aria-labelledby'?: string;
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
    readonly size: ToggleGroupSize;
    readonly type: 'single' | 'multiple';
    isActive: (value: string) => boolean;
    setValue: (value: string) => void;
};

export { Item, Root };
