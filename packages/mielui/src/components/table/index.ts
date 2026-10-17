import type {
    HTMLAttributes,
    HTMLTableAttributes,
    HTMLTdAttributes,
    HTMLThAttributes
} from 'svelte/elements';
import Root from './table.svelte';
import Body from './table-body.svelte';
import Caption from './table-caption.svelte';
import Cell from './table-cell.svelte';
import Footer from './table-footer.svelte';
import Head from './table-head.svelte';
import Header from './table-header.svelte';
import Row from './table-row.svelte';
import ScrollArea from './table-scroll-area.svelte';

export type TableProps = HTMLTableAttributes & {
    /** `inset` puts the header and footer on an outer frame and the body rows on a recessed surface. */
    variant?: 'default' | 'inset';
};
export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableCaptionProps = HTMLAttributes<HTMLElement>;
export type TableCellProps = HTMLTdAttributes;
export type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableHeadProps = HTMLThAttributes;
export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
export type TableScrollAreaProps = HTMLAttributes<HTMLDivElement>;

export { Body, Caption, Cell, Footer, Head, Header, Root, Row, ScrollArea };
