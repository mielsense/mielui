<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';

    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Siblings from './examples/siblings.svelte';
    import SiblingsSrc from './examples/siblings.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add pagination';
</script>

<svelte:head>
    <title>Mielui · Pagination</title>
    <meta
        name="description"
        content="A compact pager that truncates with an ellipsis. Always shows the first and last page so users know how big the data set is."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Pagination">
        A compact pager that truncates long ranges with an ellipsis.
    </PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}>
            <Hero />
        </ComponentPreview>
    </section>

    <!-- ─── Installation ──────────────────────────────────────────── -->
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Bind<Typography.InlineCode>page</Typography.InlineCode> to the current page, starting at
            1. Set<Typography.InlineCode>total</Typography.InlineCode> to the number of pages, not
            the number of records. Update your displayed records or fetch the next page when the
            value changes.
        </Typography.Text>
        <Typography.Text>
            Page numbers and totals are rounded down and kept within valid bounds. Non-finite values
            fall back to 1.<Typography.InlineCode>siblings</Typography.InlineCode> sets the number
            of neighboring pages shown on each side, from 0 to 100.
        </Typography.Text>

        <CodeBlock
            code={`import { Pagination } from '$lib/mielui/components/pagination';\n\nlet page = $state(1);\n\n<Pagination bind:page total={20} />`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Tune how many pages surround the current one.
            {/snippet}
        </SectionHeading>

        <div id="siblings" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Sibling count</Typography.H3>
            <ComponentPreview code={SiblingsSrc}>
                <Siblings />
            </ComponentPreview>
        </div>
    </section>
</div>
