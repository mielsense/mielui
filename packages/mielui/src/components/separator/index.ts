import type { Separator as Primitive } from 'bits-ui';
import Separator from './separator.svelte';
export type SeparatorProps = Omit<Primitive.RootProps, 'child' | 'children' | 'ref'> & {
    /** Bindable reference to the DOM element. */
    element?: HTMLDivElement | null;
};
export { Separator };
export default Separator;
