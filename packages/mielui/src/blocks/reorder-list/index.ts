import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
import ReorderList from './reorder-list.svelte';
import Content from './reorder-list-content.svelte';
import Handle from './reorder-list-handle.svelte';
import Item from './reorder-list-item.svelte';

export type ReorderListLabels = {
    hint?: string;
    grabbed?: (item: string, position: number, total: number) => string;
    moved?: (item: string, position: number, total: number) => string;
    dropped?: (item: string, position: number) => string;
    cancelled?: string;
    cancelledByChange?: string;
};

export type ReorderListProps<T> = {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: ReorderListLabels;
    /** Items in their current order. Bindable. */
    items: T[];
    /** Returns a stable id for an item. */
    getId: (item: T) => string;
    /** Returns the name announced for an item. */
    getLabel: (item: T) => string;
    /** Content rendered inside. */
    children?: Snippet<[T]>;
    /** Renders one item. */
    row?: Snippet<[T]>;
    /** Accessible name. */
    label: string;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Called with the new order on every move. */
    onReorder?: (items: T[]) => void;
    /** Called once when a move is dropped or confirmed. */
    onCommit?: (items: T[]) => void;
    /** Classes added to the element. */
    class?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type ReorderListItemProps = HTMLAttributes<HTMLDivElement> & {
    /** Id of the element. */
    id: string;
    /** Accessible name. */
    label: string;
};
export type ReorderListHandleProps = Omit<HTMLButtonAttributes, 'type'>;
export type ReorderListContentProps = HTMLAttributes<HTMLDivElement>;
export { Content, Handle, Item, ReorderList, ReorderList as Root };
export default ReorderList;
