import type { DefaultProps } from '@mielui/svelte/utils';
import Pagination from './pagination.svelte';

export type PaginationLabels = {
    navigation?: string;
    previous?: string;
    next?: string;
    page?: (page: number) => string;
};

export type PaginationProps = {
    labels?: PaginationLabels;
    page?: number;
    total: number;
    siblings?: number;
    onPageChange?: (page: number) => void;
} & DefaultProps;

export { Pagination };
export default Pagination;
