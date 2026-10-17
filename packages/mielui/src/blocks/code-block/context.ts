import { createContext } from '@mielui/svelte/utils';
import type { CodeBlockLabels, CodeBlockRegistry } from '.';

export type CodeBlockPanel = {
    readonly tabbed: boolean;
};

const { set: setCodeBlockRegistry, find: findCodeBlockRegistry } =
    createContext<CodeBlockRegistry>('code-block');
const { set: setCodeBlockPanel, find: findCodeBlockPanel } =
    createContext<CodeBlockPanel>('code-block-panel');
const { set: setCodeBlockLabels, find: findCodeBlockLabels } =
    createContext<() => CodeBlockLabels | undefined>('code-block-labels');

export {
    findCodeBlockLabels,
    findCodeBlockPanel,
    findCodeBlockRegistry,
    setCodeBlockLabels,
    setCodeBlockPanel,
    setCodeBlockRegistry
};
