<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Grid from './examples/grid.svelte';
    import GridSrc from './examples/grid.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import ImageCover from './examples/image-cover.svelte';
    import ImageCoverSrc from './examples/image-cover.svelte?raw';
    import LiveCount from './examples/live-count.svelte';
    import LiveCountSrc from './examples/live-count.svelte?raw';

    const TITLE = 'Folder Card';
    const installCommand = 'pnpm dlx @mielui/svelte add folder-card';
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta
        name="description"
        content="Present a collection as a folder with a cover, title tab, index, and count."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title={TITLE}>
        Presents a collection as a folder: a cover, a tab with its name, and a footer with an index
        and item count.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}>
            <Hero />
        </ComponentPreview>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Root renders a link when you pass
            <Typography.InlineCode>href</Typography.InlineCode>
            and an article otherwise. Cover, Tab, and Footer place themselves in the folder layout,
            so you can omit or restyle any of them. The tab grows with its title and wraps before it
            reaches the folder edge.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Cover shows a soft wash of the chart color picked by{' '}
            <Typography.InlineCode>tone</Typography.InlineCode>
            from 1 to 5. Pass{' '}
            <Typography.InlineCode>src</Typography.InlineCode>
            for an image, or children for custom content. Count formats{' '}
            <Typography.InlineCode>value</Typography.InlineCode>
            for the reader's locale and animates when it changes.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Cover clips its children to the folder shape, so content anchored to its bottom edge
            appears to come out of the folder. The first example tucks three paper sheets there and
            lifts them with{' '}
            <Typography.InlineCode>group-hover/folder-card</Typography.InlineCode>
            and{' '}
            <Typography.InlineCode>group-focus-visible/folder-card</Typography.InlineCode>
            , which a linked card provides. Mark decorative cover content{' '}
            <Typography.InlineCode>aria-hidden</Typography.InlineCode>
            and disable its transition for reduced motion.
        </Typography.Text>
        <CodeBlock
            code={`import * as FolderCard from '@mielui/svelte/components/folder-card';

<FolderCard.Root href="/projects" tone={2}>
  <FolderCard.Cover />
  <FolderCard.Tab>
    <FolderCard.Title>Client projects</FolderCard.Title>
    <FolderCard.Description>Brand, web, and product</FolderCard.Description>
  </FolderCard.Tab>
  <FolderCard.Footer>
    <FolderCard.Index>001</FolderCard.Index>
    <FolderCard.Count value={3957} />
  </FolderCard.Footer>
</FolderCard.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="image-cover" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Image cover</Typography.H3>
            <Typography.Text variant="supporting">
                Pass
                <Typography.InlineCode>src</Typography.InlineCode>
                to replace the wash. The image is decorative by default because the title names the
                folder; set
                <Typography.InlineCode>alt</Typography.InlineCode>
                when it adds information. This card omits Index, so Count stays on the right.
            </Typography.Text>
            <ComponentPreview code={ImageCoverSrc}>
                <ImageCover />
            </ComponentPreview>
        </div>

        <div id="grid" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Folder grid</Typography.H3>
            <Typography.Text variant="supporting">
                Lay cards out in your own list and grid. Each tone maps to the next chart color, and
                the columns follow the container width.
            </Typography.Text>
            <ComponentPreview code={GridSrc}>
                <Grid />
            </ComponentPreview>
        </div>

        <div id="live-count" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Changing count</Typography.H3>
            <Typography.Text variant="supporting">
                Count rolls to a new value with the theme's motion settings and settles immediately
                when reduced motion is on. A card without{' '}
                <Typography.InlineCode>href</Typography.InlineCode>
                is a static article.
            </Typography.Text>
            <ComponentPreview code={LiveCountSrc}>
                <LiveCount />
            </ComponentPreview>
        </div>
    </section>
    <section id="heading-level" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Heading level</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Title renders a heading. `level` picks 2, 3 or 4 so the card fits the outline of the page around it, and defaults to 3. The size on screen does not change."}
            />
        </Typography.Text>
    </section>
</div>
