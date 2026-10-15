import { createContext } from '@mielui/svelte/utils';
import type { TabsVariant } from '.';

export type TabsState = {
    id: string;
    value: string;
    orientation: 'horizontal' | 'vertical';
    variant: TabsVariant;
};

export type TabsContext = TabsState & {
    select: (value: string) => void;
};

const {
    set: setTabsContext,
    get: getTabsContext,
    find: findTabsContext
} = createContext<TabsContext>('tabs');

export { findTabsContext, getTabsContext, setTabsContext };
