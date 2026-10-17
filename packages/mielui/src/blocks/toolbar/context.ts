import { createContext } from '@mielui/svelte/utils';

type ToolbarOrientation = () => 'horizontal' | 'vertical';
type ToolbarVariant = () => 'default' | 'depth';

const { set: setToolbarOrientation, get: getToolbarOrientation } =
    createContext<ToolbarOrientation>('toolbar');
const { set: setToolbarVariant, find: findToolbarVariant } =
    createContext<ToolbarVariant>('toolbar-variant');

function getToolbarVariant(): ToolbarVariant {
    return findToolbarVariant() ?? (() => 'default');
}

export { getToolbarOrientation, getToolbarVariant, setToolbarOrientation, setToolbarVariant };
