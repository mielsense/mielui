import type { DefaultProps } from '@mielui/svelte/utils';
import Slider from './slider.svelte';

type SliderBaseProps = {
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    label?: string;
    dir?: 'ltr' | 'rtl';
} & DefaultProps;

export type SliderProps = SliderBaseProps &
    (
        | {
              range?: false;
              value?: number;
              thumbLabels?: never;
              onValueChange?: (value: number) => void;
          }
        | {
              range: true;
              value?: [number, number];
              thumbLabels?: [string, string];
              onValueChange?: (value: [number, number]) => void;
          }
    );

export { Slider };
export default Slider;
