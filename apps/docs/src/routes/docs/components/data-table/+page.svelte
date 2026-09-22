<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Controlled from './examples/controlled.svelte';
    import ControlledSrc from './examples/controlled.svelte?raw';
    import SetupSrc from './examples/data.ts?raw';
    import Empty from './examples/empty.svelte';
    import EmptySrc from './examples/empty.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
</script>
<svelte:head>
    <title>Mielui · Data Table</title>
    <meta
        name="description"
        content="Composable TanStack Table v9 presentation, with sorting, filtering, row selection, and pagination."
    />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>Data Table</Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                Sort, filter, and select rows in an inset table. Compose the toolbar and footer
                around your data.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>
    <section id="hero" class="flex flex-col gap-4">
        <ComponentPreview code={HeroSrc} class="w-full"><Hero /></ComponentPreview>
    </section>
    <section id="installation" class="flex flex-col gap-4">
        <Typography.H2>Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add data-table" />
        <Typography.Text>
            With Vite SSR, keep the v9.2.4 Svelte adapter in the bundled dependencies so Node can
            resolve its Svelte module imports.
        </Typography.Text>
        <CodeBlock
            code={"export default defineConfig({\n    ssr: { noExternal: ['@tanstack/svelte-table'] }\n});"}
            lang="typescript"
        />
    </section>
    <section id="setup" class="flex flex-col gap-4">
        <Typography.H2>Create your table</Typography.H2>
        <Typography.Text>
            DataTable accepts a table created by @tanstack/svelte-table 9.2.4. Use v9 createTable
            and tableFeatures; v8 createSvelteTable examples use a different API. Register only the
            features and row models your table needs. Mielui renders that instance and never copies
            its data or owns a second sorting, filtering, selection, or pagination state.
        </Typography.Text>
        <CodeBlock code={SetupSrc} lang="typescript" copy="overlay" />
    </section>
    <section id="composition" class="flex flex-col gap-4">
        <Typography.H2>Compose each region</Typography.H2>
        <Typography.Text>
            Root without children renders View, Summary, and Pagination. The same public parts build
            custom layouts: move Summary into Toolbar, omit pagination, or place controls before and
            after View. Root's children snippet receives table, rows, total, and selected. Summary
            exposes the same data through its children snippet. Toolbar is a layout container, not
            an extra keyboard toolbar.
        </Typography.Text>
        <Typography.Text>
            View uses Mielui's semantic Table parts. Its Header and Body are separately exported for
            composing inside Table.Root. Header and cell snippets receive the original TanStack
            objects; use FlexRender for standard column definitions, renderSnippet for Svelte
            snippets inside definitions, or render your own markup. Empty receives loading and
            occupies one row spanning the visible columns. Header supports grouped columns; Body
            respects column visibility when that feature is installed.
        </Typography.Text>
        <Typography.Text>
            ColumnHeader offers explicit ascending, descending, and clear-sort choices; sorted
            headers expose aria-sort. Sort provides a separate field-and-direction menu, with
            checked radio choices. Pass its columns prop to control available fields and labels.
            Sorting, pagination, and selection parts disappear or disable themselves when their
            corresponding TanStack feature is absent. Provide a meaningful caption for the table.
        </Typography.Text>
    </section>
    <section id="filters" class="flex flex-col gap-4">
        <Typography.H2>Search and filter</Typography.H2>
        <Typography.Text>
            Place Filter inside Filters to join the search input and Filter button with Group. The
            optional children snippet renders before the button. Active facets and Reset stay
            outside that group. Omit children for a standalone filter picker. The picker stays
            visible and disables itself when every available filter is shown.
        </Typography.Text>
        <Typography.Text>
            Filter is a labeled search input for a string column filter, such as name with
            includesString. Filters accepts a list of definitions with column, label, and type:
            text, select, number, or date. Its menu reveals editable chips; selecting a field opens
            its editor immediately. Select definitions supply value/label options and support
            multiple choices. Number definitions can supply min, max, and step. Date editors use
            Mielui DatePicker. Combine these controls in Toolbar with Sort, as in the first example.
        </Typography.Text>
        <Typography.Text>
            Register dataTableFilter as each facet column's filterFn. Facets store a typed
            DataTableFilterClause in TanStack's columnFilters state: type, operator, and value. Text
            supports contains, equals, and not; select supports in and notIn. Number and date
            support equals, lt, lte, gt, gte, and inclusive between bounds. Built-in editors offer
            the common comparisons; custom editors can use the complete clause type. Text matching
            ignores case, numeric cells must contain numbers, and date cells use ISO calendar-date
            strings. Empty bounds remain open. These are client-side predicates, not a server query
            language; validate persisted filters and translate them for your backend yourself.
        </Typography.Text>
        <Typography.Text>
            Facet is independently composable with table and filter props, bind:open, onOpenChange,
            and onRemove. A definition's editor snippet receives value and setValue for a custom
            control using your column's filterFn. Remove filter clears that column. Filters' Reset
            clears and hides its configured facets while leaving the separate search input alone.
            All filters combine through TanStack's filtering state; no second filter store is owned
            by Mielui.
        </Typography.Text>
    </section>
    <section id="controlled" class="flex flex-col gap-4">
        <Typography.H2>Own the state and layout</Typography.H2>
        <Typography.Text>
            Use reactive data getters when rows can change. TanStack's createTableState supports
            controlled state slices; pair each controlled slice with its change callback. Table
            atoms and methods participate in Svelte reactivity. This composition reorders its
            summary and omits pagination.
        </Typography.Text>
        <ComponentPreview code={ControlledSrc}><Controlled /></ComponentPreview>
    </section>
    <section id="selection" class="flex flex-col gap-4">
        <Typography.H2>Selection and stable identity</Typography.H2>
        <Typography.Text>
            Set selectable on Root or View to add a selection column. Register rowSelectionFeature
            and provide getRowId with a stable record ID; index-based IDs can select the wrong
            record after data is replaced. The header checkbox selects only the current page's
            selectable rows and shows mixed state for partial selection. rowLabel supplies a
            human-readable checkbox name. Selection can persist across filtering and pages; Summary
            reports selected IDs separately from the current row total. For server pagination,
            selected IDs may refer to records not loaded on this page.
        </Typography.Text>
        <Typography.Text>
            Selection is also an exported checkbox part for custom columns. It accepts checked,
            indeterminate, disabled, label, and onCheckedChange. For grouping or tree rows, compose
            your own selection controls using TanStack's row-selection APIs and the required
            parent/child policy.
        </Typography.Text>
    </section>
    <section id="empty" class="flex flex-col gap-4">
        <Typography.H2>Empty and loading states</Typography.H2>
        <Typography.Text>
            loading marks the root/table busy and disables pagination. Existing rows remain visible
            during refresh; an empty loading table shows a status message. Override the empty
            snippet for an explanation or recovery action. Error messages and retry policies remain
            application-owned.
        </Typography.Text>
        <ComponentPreview code={EmptySrc}><Empty /></ComponentPreview>
    </section>
    <section id="server" class="flex flex-col gap-4">
        <Typography.H2>Server data</Typography.H2>
        <Typography.Text>
            For server filtering, sorting, or pagination, configure the corresponding manual options
            on the TanStack instance and pass the returned rows through a reactive data getter.
            Supply rowCount or pageCount when known; pageCount=-1 keeps Next available without
            inventing a final page. Keep request cancellation, URL state, and error handling in your
            application. DataTable does not fetch or virtualize rows. Use pagination for large
            lists, and measure before adding virtualization.
        </Typography.Text>
    </section>
</div>
