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

export type ColorPickerLabels = {
    /** Trigger text and name when no color is chosen. */
    choose?: string;
    /** Accessible name of the panel when Root has no `label`. */
    picker?: string;
    /** Accessible name of the hex input. */
    hex?: string;
    /** Accessible name of the button that picks a color from the screen. */
    eyedropper?: string;
    /** Accessible name of the trigger when Root has a `label`, given that label and the color. */
    trigger?: (label: string, color: string) => string;
    /** Accessible name of the hue slider and channel. */
    hue?: string;
    /** Accessible name of the saturation slider and channel. */
    saturation?: string;
    /** Accessible name of the HSL lightness channel. */
    lightness?: string;
    /** Accessible name of the HSV brightness slider and channel. */
    brightness?: string;
    /** Accessible name of the RGB red channel. */
    red?: string;
    /** Accessible name of the RGB green channel. */
    green?: string;
    /** Accessible name of the RGB blue channel. */
    blue?: string;
};

export type ColorPickerProps = {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: ColorPickerLabels;
    /** Accessible name of the trigger. */
    label?: string;
    /** Selected color as a hex string. Bindable. */
    value?: string;
    /** Called with the new value when it changes. */
    onValueChange?: (value: string) => void;
    /** Preset swatches offered at the bottom of the panel. */
    options?: ColorOption[];
    /** Channel controls to show: HSL, RGB, or HSV. */
    format?: ColorFormat;
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps;

export type ColorPickerContentProps = Omit<PopoverContentProps, 'children'> & {
    /** Content rendered inside. */
    children?: Snippet;
};

export { Channels, Content, HexInput, Hue, Plane, Presets, Preview, Root, Trigger };

export type ColorPickerPlaneProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type ColorPickerHueProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type ColorPickerPreviewProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

export type ColorPickerHexInputProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type ColorPickerChannelsProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type ColorPickerPresetsProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;
