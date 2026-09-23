<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
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
    <PageIntro title="Table">Display rows and columns with native table semantics.</PageIntro>

    <ComponentPreview code={HeroSource}><Hero /></ComponentPreview>
    <section id="installation" class="flex flex-col gap-4">
        <Typography.H2>Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add table" />
    </section>
    <section id="usage" class="flex flex-col gap-4">
        <Typography.H2>Usage</Typography.H2>
        <CodeBlock copy="overlay" code={usage} lang="svelte" />
        <Typography.Text>
            <Typography.InlineCode>Root</Typography.InlineCode> renders a table. Wrap it in<Typography.InlineCode
            >
                ScrollArea
            </Typography.InlineCode> when columns need horizontal scrolling. Omit<Typography.InlineCode
            >
                Caption
            </Typography.InlineCode> or<Typography.InlineCode>Footer</Typography.InlineCode> when
            the data does not need them. Set<Typography.InlineCode>class</Typography.InlineCode> on
            each part to change alignment, wrapping, or column widths.
        </Typography.Text>
        <Typography.Text>
            <Typography.InlineCode>Head</Typography.InlineCode> defaults to<Typography.InlineCode>
                scope="col"
            </Typography.InlineCode>
            . Use<Typography.InlineCode>scope="row"</Typography.InlineCode> for row headings.<Typography.InlineCode
            >
                Cell
            </Typography.InlineCode> accepts<Typography.InlineCode>colspan</Typography.InlineCode>
            ,<Typography.InlineCode>rowspan</Typography.InlineCode>
            , and<Typography.InlineCode>headers</Typography.InlineCode>
            .
        </Typography.Text>
        <Typography.Text>
            For sorting, put a Button in the heading and update<Typography.InlineCode>
                aria-sort
            </Typography.InlineCode> when the order changes. Keep selection and pagination in your
            application state, using Checkbox and Pagination as needed.
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
