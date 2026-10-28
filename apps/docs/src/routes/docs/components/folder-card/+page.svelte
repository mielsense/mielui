<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as FolderCard from '@mielui/svelte/components/folder-card';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
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

    const playgroundTones: Record<'1' | '2' | '3' | '4' | '5', 1 | 2 | 3 | 4 | 5> = {
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5
    };

    let playgroundOpened = $state(false);

    const usageCode = `<script lang="ts">
    import * as FolderCard from '@mielui/svelte/components/folder-card';
</${'script'}>

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
</FolderCard.Root>`;
</script>

<svelte:head>
    <title>Mielui · Folder Card</title>
    <meta
        name="description"
        content="Present a collection as a folder with a cover, title tab, index, and count."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Folder Card">
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
                                <FolderCard.Count value={3957} />
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
        <InstallCommand command="pnpm dlx @mielui/svelte add folder-card" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root renders a link when you pass `href`, a button when you pass `onclick` on its own, and an article otherwise. Cover, Tab, and Footer place themselves in the folder layout, so you can omit or restyle any of them. The tab grows with its title and wraps before it reaches the folder edge."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Cover shows a soft wash of the chart color picked by `tone`, from 1 to 5. Pass `src` for an image, or children for custom content. Count formats `value` for the reader's locale, follows it with files (file for one), and animates when the value changes. Pass `labels.count` on Root to write that text yourself; it receives the number and its formatted form, so a translation can place the number and choose the plural. Every key in `labels` is optional and English is the fallback."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Cover clips its children to the folder shape, so content anchored to its bottom edge appears to come out of the folder. Mark decorative cover content `aria-hidden`. A linked or clickable card darkens its border on hover; nothing inside it moves."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
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
                <InlineText
                    text={"Pass `src` to replace the wash. The image is decorative by default because the title names the folder; set `alt` when it adds information. This card omits Index, so Count stays on the right, and its `labels.count` counts images instead of files."}
                />
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
                when reduced motion is on. This card has no href or onclick, so it is a static
                article.
            </Typography.Text>
            <ComponentPreview code={LiveCountSrc}>
                <LiveCount />
            </ComponentPreview>
        </div>
    </section>

    <section id="heading-level" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Heading level</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Title renders a heading. `level` picks 2, 3 or 4 so the card fits the outline of the page around it, and defaults to 3. The size on screen does not change."}
            />
        </Typography.Text>
    </section>

    <section id="click-action" class="scroll-mt-20 flex flex-col gap-4">
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
