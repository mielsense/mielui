<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Pagination } from '@mielui/svelte/components/pagination';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Siblings from './examples/siblings.svelte';
    import SiblingsSrc from './examples/siblings.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const labelsSnippet = `<script lang="ts">
    import { Pagination, type PaginationLabels } from '@mielui/svelte/components/pagination';

    let page = $state(1);

    const labels: PaginationLabels = {
        navigation: 'Pagination',
        previous: 'Page précédente',
        next: 'Page suivante',
        page: (number) => \`Page \${number}\`
    };
<${'/'}script>

<Pagination bind:page total={12} {labels} />`;

    const usageSnippet = `<script lang="ts">
    import { Pagination } from '@mielui/svelte/components/pagination';

    let page = $state(1);
<${'/'}script>

<Pagination bind:page total={20} />`;
</script>

<svelte:head>
    <title>Mielui · Pagination</title>
    <meta
        name="description"
        content="A compact pager that truncates with an ellipsis. Always shows the first and last page so users know how big the data set is."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Pagination"
        >A compact pager that truncates long ranges with an ellipsis.</PageIntro
    >

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <Pagination page={values.page} total={values.total} siblings={values.siblings} />
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add pagination" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `page` to the current page, starting at 1, and set `total` to the number of pages, not records. Load or show the matching records when `page` changes, or respond in `onPageChange`. The first and last pages always show."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`siblings` is how many pages show on each side of the current one, 1 by default and at most 100. Page numbers and totals are rounded down and kept in range; values that are not finite fall back to 1. Pagination renders no children, so put a page-size select or a result count beside it in your own layout."}
            />
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                A paged result list, and more pages around the current one.
            {/snippet}
        </SectionHeading>

        <div id="result-list" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Result list</Typography.H3>
            <Typography.Text variant="supporting">
                The pager sits under a list of invoices and decides which five are shown.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="siblings" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Siblings</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`siblings={2}` shows two pages on each side of the current one."}
                />
            </Typography.Text>
            <ComponentPreview code={SiblingsSrc}>
                <Siblings />
            </ComponentPreview>
        </div>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Pass `labels` to translate the navigation landmark and the accessible names of the previous, next, and page buttons. `page` is a function that receives the page number. Every key of `PaginationLabels` is optional; omitted keys keep the English text."}
            />
        </Typography.Text>
        <CodeBlock code={labelsSnippet} lang="svelte" copy="overlay" />
    </section>
</div>
