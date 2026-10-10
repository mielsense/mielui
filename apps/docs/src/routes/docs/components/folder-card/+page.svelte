<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as FolderCard from '@mielui/svelte/components/folder-card';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import ClickActionExample from './examples/click-action.svelte';
    import ClickActionExampleSrc from './examples/click-action.svelte?raw';
    import Grid from './examples/grid.svelte';
    import GridSrc from './examples/grid.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import ImageCover from './examples/image-cover.svelte';
    import ImageCoverSrc from './examples/image-cover.svelte?raw';
    import LiveCount from './examples/live-count.svelte';
    import LiveCountSrc from './examples/live-count.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const TITLE = 'Folder Card';
    const installCommand = 'pnpm dlx @mielui/svelte add folder-card';

    const playgroundTones: Record<'1' | '2' | '3' | '4' | '5', 1 | 2 | 3 | 4 | 5> = {
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5
    };

    let playgroundOpened = $state(false);
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
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#snippet folder()}
                    {#if values.cover === 'image'}
                        <FolderCard.Cover src="/og-default.png" />
                    {:else if values.cover === 'tone'}
                        <FolderCard.Cover />
                    {/if}
                    <FolderCard.Tab>
                        <FolderCard.Title>{values.title}</FolderCard.Title>
                        {#if values.description}
                            <FolderCard.Description>Brand, web, and product</FolderCard.Description>
                        {/if}
                    </FolderCard.Tab>
                    {#if values.index || values.count}
                        <FolderCard.Footer>
                            {#if values.index}
                                <FolderCard.Index>001</FolderCard.Index>
                            {/if}
                            {#if values.count}
                                <FolderCard.Count value={values.value} unit={values.unit} />
                            {/if}
                        </FolderCard.Footer>
                    {/if}
                {/snippet}
                <div class="flex w-full max-w-xs flex-col gap-3">
                    {#if values.action === 'link'}
                        <FolderCard.Root
                            href="/docs/components"
                            tone={playgroundTones[values.tone]}
                        >
                            {@render folder()}
                        </FolderCard.Root>
                    {:else if values.action === 'button'}
                        <FolderCard.Root
                            tone={playgroundTones[values.tone]}
                            disabled={values.disabled}
                            onclick={() => {
                                playgroundOpened = true;
                            }}
                        >
                            {@render folder()}
                        </FolderCard.Root>
                        <p role="status" class="text-sm text-foreground-muted">
                            {playgroundOpened ? 'Opened the folder' : 'Nothing opened yet'}
                        </p>
                    {:else}
                        <FolderCard.Root tone={playgroundTones[values.tone]}>
                            {@render folder()}
                        </FolderCard.Root>
                    {/if}
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Root renders a link when you pass{' '}
            <Typography.InlineCode>href</Typography.InlineCode>
            , a button when you pass{' '}
            <Typography.InlineCode>onclick</Typography.InlineCode>
            {' '}
            on its own, and an article otherwise. Cover, Tab, and Footer place themselves in the
            folder layout, so you can omit or restyle any of them. The tab grows with its title and
            wraps before it reaches the folder edge.
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
            appears to come out of the folder. The first example tucks three paper sheets there.
            Mark decorative cover content{' '}
            <Typography.InlineCode>aria-hidden</Typography.InlineCode>
            . A linked or clickable card darkens its border on hover and nothing inside it moves.
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

        <div id="custom-cover" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Custom cover</Typography.H3>
            <Typography.Text variant="supporting">
                Paper sheets drawn inside Cover sit above the tone wash.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
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
    <section id="click-action" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Click action</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Pass `onclick` without `href` to make the whole card a button. It answers a click, Enter and Space, shows the same hover and focus treatment as the link form, and takes its accessible name from the Title. Use it for a card that opens a dialog or selects something in place of going to a page."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`disabled` blocks the action and dims the card. With `href`, `onclick` is passed to the link and runs before the browser follows it. A card with neither stays a static article."}
            />
        </Typography.Text>
        <ComponentPreview code={ClickActionExampleSrc}>
            <ClickActionExample />
        </ComponentPreview>
    </section>
</div>
