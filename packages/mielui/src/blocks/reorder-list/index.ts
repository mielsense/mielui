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
    labels?: ReorderListLabels;
    items: T[];
    getId: (item: T) => string;
    getLabel: (item: T) => string;
    children?: Snippet<[T]>;
    row?: Snippet<[T]>;
    label: string;
    disabled?: boolean;
    onReorder?: (items: T[]) => void;
    onCommit?: (items: T[]) => void;
    class?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type ReorderListItemProps = HTMLAttributes<HTMLDivElement> & {
    id: string;
    label: string;
};
export type ReorderListHandleProps = Omit<HTMLButtonAttributes, 'type'>;
export type ReorderListContentProps = HTMLAttributes<HTMLDivElement>;
export { Content, Handle, Item, ReorderList, ReorderList as Root };
export default ReorderList;
