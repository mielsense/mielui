import { createContext } from '@mielui/svelte/utils';
import type { ColorPickerLabels } from '.';

export type ColorOption = {
    label: string;
    value: string;
};

export type ColorFormat = 'hsl' | 'rgb' | 'hsv';

/** Shared between ColorPicker.Root, .Trigger, and .Content. Root owns the
 * value/options and exposes `apply` so Trigger/Content can commit a new hex. */
export type ColorPickerContext = {
    readonly labelId: string;
    readonly label: string | undefined;
    readonly labels: ColorPickerLabels | undefined;
    readonly value: string;
    readonly options: ColorOption[];
    readonly format: ColorFormat;
    apply: (hex: string) => void;
};

const { set: setColorPickerContext, get: getColorPickerContext } =
    createContext<ColorPickerContext>('color-picker');

export { getColorPickerContext, setColorPickerContext };
