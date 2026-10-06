import type { DefaultProps } from '@mielui/svelte/utils';
import Pagination from './pagination.svelte';

export type PaginationLabels = {
    navigation?: string;
    previous?: string;
    next?: string;
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
