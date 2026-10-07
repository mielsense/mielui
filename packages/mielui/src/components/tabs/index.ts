import type { DefaultProps } from '@mielui/svelte/utils';
import Root from './tabs.svelte';
import Content from './tabs-content.svelte';
import List from './tabs-list.svelte';
import Trigger from './tabs-trigger.svelte';

export type TabsVariant = 'default' | 'ghost' | 'segmented';

export type TabsState = {
    id: string;
    value: string;
    orientation: 'horizontal' | 'vertical';
    variant: TabsVariant;
};

export type TabsProps = {
    /** `automatic` selects a tab on focus. `manual` waits for Enter or Space. */
    activationMode?: 'automatic' | 'manual';
    /** Selected tab. Bindable. */
    value?: string;
    /** Called with the new value when it changes. */
    onValueChange?: (value: string) => void;
    /** Direction of the tab list. It also sets which arrow keys move between tabs. */
    orientation?: 'horizontal' | 'vertical';
    /** Style of the tab list. */
    variant?: TabsVariant;
} & DefaultProps;

export type TabsListProps = DefaultProps;

export type TabsTriggerProps = {
    /** Identifies the tab. It matches a panel's value. */
    value: string;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
} & DefaultProps;

export type TabsContentProps = {
    /** Identifies the panel. It matches a trigger's value. */
    value: string;
    /** Keeps the panel mounted while hidden, so its state survives. */
    forceMount?: boolean;
} & DefaultProps;

export { Content, List, Root, Trigger };
