import type { PopoverContentProps } from '@mielui/svelte/components/popover';
import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import Channels from './color-picker-channels.svelte';
import Content from './color-picker-content.svelte';
import HexInput from './color-picker-hex-input.svelte';
import Hue from './color-picker-hue.svelte';
import Plane from './color-picker-plane.svelte';
import Presets from './color-picker-presets.svelte';
import Preview from './color-picker-preview.svelte';
import Root from './color-picker-root.svelte';
import Trigger from './color-picker-trigger.svelte';
import type { ColorFormat, ColorOption } from './context';

export type { ColorFormat, ColorOption, ColorPickerContext } from './context';

export type ColorPickerProps = {
    label?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    options?: ColorOption[];
    format?: ColorFormat;
    children?: Snippet;
} & DefaultProps;

export type ColorPickerContentProps = Omit<PopoverContentProps, 'children'> & {
    children?: Snippet;
};

export { Channels, Content, HexInput, Hue, Plane, Presets, Preview, Root, Trigger };

export type ColorPickerPlaneProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type ColorPickerHueProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type ColorPickerPreviewProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

export type ColorPickerHexInputProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type ColorPickerChannelsProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type ColorPickerPresetsProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;
