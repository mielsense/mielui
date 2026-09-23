import type { HTMLAttributes, HTMLFieldsetAttributes } from 'svelte/elements';
import Root from './fieldset.svelte';
import Description from './fieldset-description.svelte';
import Legend from './fieldset-legend.svelte';

export type FieldsetProps = HTMLFieldsetAttributes & { element?: HTMLFieldSetElement };
export type FieldsetLegendProps = HTMLAttributes<HTMLLegendElement>;
export type FieldsetDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export { Description, Legend, Root };
