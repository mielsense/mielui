import { createContext } from '@mielui/svelte/utils';
import type { TabsState } from '.';

export type TabsContext = TabsState & {
    select: (value: string) => void;
};

const {
    set: setTabsContext,
    get: getTabsContext,
    find: findTabsContext
} = createContext<TabsContext>('tabs');

export { findTabsContext, getTabsContext, setTabsContext };
