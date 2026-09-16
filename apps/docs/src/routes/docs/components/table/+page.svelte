<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSource from './examples/hero.svelte?raw';
    import Inset from './examples/inset.svelte';
    import InsetSource from './examples/inset.svelte?raw';
    import Interactive from './examples/interactive.svelte';
    import InteractiveSource from './examples/interactive.svelte?raw';

    import usage from './examples/usage.svelte?raw';
</script>

<svelte:head>
    <title>Mielui · Table</title>
    <meta name="description" content="Display rows and columns with native table semantics." />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>Table</Typography.H1>
            <Typography.Text variant="lead" class="mt-2">
                Display rows and columns with native table semantics.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>

    <ComponentPreview code={HeroSource}><Hero /></ComponentPreview>
    <section id="installation" class="flex flex-col gap-4">
        <Typography.H2>Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add table" />
    </section>
    <section id="usage" class="flex flex-col gap-4">
        <Typography.H2>Usage</Typography.H2>
        <CodeBlock code={usage} lang="svelte" />
        <Typography.Text>
            Root renders a table. ScrollArea is optional and contains horizontal scrolling. Omit
            Caption or Footer when the data does not need them. Set class on each part to control
            column widths, alignment, wrapping, or sticky headers. Head defaults to scope="col"; use
            scope="row" for row headings. Cell forwards colspan, rowspan, and headers. Use aria-sort
            on a sortable heading and a real Button to change order. Selection and pagination stay
            in your application state; compose Checkbox and Pagination when needed.
        </Typography.Text>
    </section>
    <section class="flex flex-col gap-4">
        <Typography.H2>Inset</Typography.H2>
        <ComponentPreview code={InsetSource}><Inset /></ComponentPreview>
    </section>
    <section class="flex flex-col gap-4">
        <Typography.H2>Sorting and selection</Typography.H2>
        <ComponentPreview code={InteractiveSource}><Interactive /></ComponentPreview>
    </section>
</div>
