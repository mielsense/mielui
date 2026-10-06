import type { DefaultProps } from '@mielui/svelte/utils';
import Slider from './slider.svelte';

export type SliderVariant = 'default' | 'field';

type SliderBaseProps = {
    /** Smallest allowed value. */
    min?: number;
    /** Largest allowed value. */
    max?: number;
    /** Amount each step changes the value by. */
    step?: number;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Names the handle. The field variant also shows it inside the control. */
    label?: string;
    /** Formats a value for assistive technology and for the field variant's readout. */
    format?: (value: number) => string;
    /** Text direction. It flips the track for right-to-left. */
    dir?: 'ltr' | 'rtl';
    /** Id of the element. */
    id?: string;
    /** Field name submitted with the form. */
    name?: string;
    /** Id of the form this control belongs to when it sits outside that form. */
    form?: string;
    /** Bindable reference to the DOM element. */
    element?: HTMLDivElement;
    /** Accessible name when there is no visible label. */
    'aria-label'?: string;
    /** Id of the element that labels it. */
    'aria-labelledby'?: string;
    /** Id of the element that describes it. */
    'aria-describedby'?: string;
} & DefaultProps;

export type SliderProps = SliderBaseProps &
    (
        | {
              /** Uses two thumbs and makes `value` a pair. */
              range?: false;
              /** `field` puts the label and value inside a bar you drag anywhere to scrub. */
              variant?: SliderVariant;
              /** Current value, or a pair in range mode. Bindable. */
              value?: number;
              /** Accessible names of the two thumbs in range mode. */
              thumbLabels?: never;
              /** Called with the new value when it changes. */
              onValueChange?: (value: number) => void;
              /** Called once when a drag ends with a new value, and after each keyboard or typed change. */
              onValueCommit?: (value: number) => void;
              /**
               * Field variant only. Lets people click the value, or press Enter, and type an exact
               * number. Typed numbers snap to `step` and clamp to `min` and `max`.
               */
              editable?: boolean;
              /**
               * Turns typed text into a number for `editable`. Return `null` to reject it. Defaults
               * to the first number in the text, so units such as `px` are ignored.
               */
              parse?: (text: string) => number | null;
          }
        | {
              /** Uses two thumbs and makes `value` a pair. */
              range: true;
              variant?: never;
              /** Current value, or a pair in range mode. Bindable. */
              value?: [number, number];
              /** Accessible names of the two thumbs in range mode. */
              thumbLabels?: [string, string];
              /** Called with the new value when it changes. */
              onValueChange?: (value: [number, number]) => void;
              /** Called once when a drag ends with a new pair, and after each keyboard change. */
              onValueCommit?: (value: [number, number]) => void;
              editable?: never;
              parse?: never;
          }
    );

export { Slider };
export default Slider;
