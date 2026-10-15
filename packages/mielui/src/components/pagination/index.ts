import type { DefaultProps } from '@mielui/svelte/utils';
import Pagination from './pagination.svelte';

export type PaginationLabels = {
    /** Accessible name of the navigation landmark. */
    navigation?: string;
    /** Accessible name of the previous-page button. */
    previous?: string;
    /** Accessible name of the next-page button. */
    next?: string;
    /** Accessible name of a page button. Without it, the page number names the button. */
    page?: (page: number) => string;
};

export type PaginationProps = {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: PaginationLabels;
    /** Current page, starting at 1. Bindable. */
    page?: number;
    /** Number of pages. */
    total: number;
    /** Page links shown on each side of the current page. */
    siblings?: number;
    /** Called with the new page. */
    onPageChange?: (page: number) => void;
} & DefaultProps;

export { Pagination };
export default Pagination;
