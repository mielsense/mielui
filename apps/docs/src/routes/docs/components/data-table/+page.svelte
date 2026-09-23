<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
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
    <PageIntro title="Data Table">
        Sort, filter, and select rows in an inset table. Compose the toolbar and footer around your
        data.
    </PageIntro>
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
            copy="overlay"
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
            View renders Mielui Table parts. To arrange the table yourself, place DataTable.Header
            and DataTable.Body inside Table.Root. Header supports grouped columns, and Body respects
            column visibility when that feature is installed.
        </Typography.Text>
        <Typography.Text>
            Header and cell snippets receive the original TanStack objects. Use FlexRender for
            column definitions or renderSnippet for Svelte snippets within them. Empty accepts
            loading and spans the visible columns in a single row.
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
            Filter searches a string column such as name with includesString. Filters accepts
            definitions with column, label, and type: text, select, number, or date. Choosing a
            field adds its chip and opens the editor.
        </Typography.Text>
        <Typography.Text>
            Select definitions need value/label options and can accept multiple choices. Number
            definitions accept min, max, and step. Date editors use DatePicker. Place these controls
            with Sort inside Toolbar.
        </Typography.Text>
        <Typography.Text>
            Register dataTableFilter as each facet column's filterFn. Facets store a
            DataTableFilterClause in TanStack's columnFilters state, containing type, operator, and
            value.
        </Typography.Text>
        <Typography.Text>
            Text clauses support contains, equals, and not. Select clauses support in and notIn.
            Number and date clauses support equals, lt, lte, gt, gte, and inclusive between bounds.
            Built-in editors offer common comparisons; custom editors can use the complete clause
            type.
        </Typography.Text>
        <Typography.Text>
            Text matching ignores case. Numeric cells must contain numbers, and date cells must use
            ISO calendar-date strings. Empty bounds stay open. These filters run on the client.
            Validate saved filters and translate them into your own backend queries for server
            filtering.
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
            and give getRowId a stable record ID. Index-based IDs can select the wrong record when
            data changes.
        </Typography.Text>
        <Typography.Text>
            The header checkbox selects the current page's selectable rows and shows a mixed state
            for partial selection. Use rowLabel to give each checkbox a readable name.
        </Typography.Text>
        <Typography.Text>
            Selection can persist across filters and pages. Summary reports selected IDs separately
            from the current row total. With server pagination, some selected records may not be
            loaded on the current page.
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
            For server filtering, sorting, or pagination, enable the corresponding TanStack manual
            options and pass returned rows through a reactive data getter. Supply rowCount or
            pageCount when known. Use pageCount=-1 to keep Next available when the last page is
            unknown.
        </Typography.Text>
        <Typography.Text>
            Handle request cancellation, URL state, and errors in your application. DataTable does
            not fetch or virtualize rows. Use pagination for large lists.
        </Typography.Text>
    </section>
</div>
