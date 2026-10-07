import type { DefaultProps } from '@mielui/svelte/utils';
import type { HTMLLabelAttributes } from 'svelte/elements';
import Label from './label.svelte';

export type LabelProps = DefaultProps &
    HTMLLabelAttributes & {
        /**
         * Shows a required mark after the text. The mark is hidden from assistive technology, so
         * set `required` on the control as well.
         */
        required?: boolean;
    };

export { Label };
export default Label;
