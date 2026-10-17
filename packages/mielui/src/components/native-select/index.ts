import type {
    HTMLOptgroupAttributes,
    HTMLOptionAttributes,
    HTMLSelectAttributes
} from 'svelte/elements';
import Root from './native-select.svelte';
import OptGroup from './native-select-opt-group.svelte';
import Option from './native-select-option.svelte';

export type NativeSelectProps = Omit<HTMLSelectAttributes, 'value' | 'multiple'> &
    (
        | {
              /** Allows several options to be selected and makes `value` an array. */
              multiple?: false;
              /** Selected value, or an array when `multiple` is set. Bindable. */
              value?: string;
          }
        | {
              /** Allows several options to be selected and makes `value` an array. */
              multiple: true;
              /** Selected value, or an array when `multiple` is set. Bindable. */
              value?: string[];
          }
    );

export type NativeSelectOptGroupProps = HTMLOptgroupAttributes;

export type NativeSelectOptionProps = Omit<HTMLOptionAttributes, 'value'> & {
    /** Value submitted when this option is selected. */
    value?: string;
};

export { OptGroup, Option, Root };
