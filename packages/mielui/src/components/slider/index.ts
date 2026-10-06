import type { DefaultProps } from '@mielui/svelte/utils';
import Slider from './slider.svelte';

export type SliderVariant = 'default' | 'field';

type SliderBaseProps = {
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    /** Names the handle. The field variant also shows it inside the control. */
    label?: string;
    /** Formats a value for assistive technology and for the field variant's readout. */
    format?: (value: number) => string;
    dir?: 'ltr' | 'rtl';
    id?: string;
    name?: string;
    form?: string;
    element?: HTMLDivElement;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
} & DefaultProps;

export type SliderProps = SliderBaseProps &
    (
        | {
              range?: false;
              /** `field` puts the label and value inside a bar you drag anywhere to scrub. */
              variant?: SliderVariant;
              value?: number;
              thumbLabels?: never;
              onValueChange?: (value: number) => void;
          }
        | {
              range: true;
              variant?: never;
              value?: [number, number];
              thumbLabels?: [string, string];
              onValueChange?: (value: [number, number]) => void;
          }
    );

export { Slider };
export default Slider;
