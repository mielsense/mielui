import type { Separator as Primitive } from 'bits-ui';
import Separator from './separator.svelte';
export type SeparatorProps = Omit<Primitive.RootProps, 'child' | 'children' | 'ref'> & {
    element?: HTMLDivElement | null;
};
export { Separator };
export default Separator;
