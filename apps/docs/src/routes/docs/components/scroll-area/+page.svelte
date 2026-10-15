<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Blur from './examples/blur.svelte';
    import BlurSrc from './examples/blur.svelte?raw';
    import Both from './examples/both.svelte';
    import BothSrc from './examples/both.svelte?raw';
    import GroupedList from './examples/grouped-list.svelte';
    import GroupedListSrc from './examples/grouped-list.svelte?raw';
    import Horizontal from './examples/horizontal.svelte';
    import HorizontalSrc from './examples/horizontal.svelte?raw';
    import {
        chats as playgroundChats,
        code as playgroundCode,
        controls as playgroundControls,
        SURFACE
    } from './playground';

    const usageCode = `<script lang="ts">
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
</${'script'}>

<ScrollArea class="h-48 w-64">
    <div>Your content here</div>
</ScrollArea>`;
</script>

<svelte:head>
    <title>Mielui · Scroll Area</title>
    <meta
        name="description"
        content="A scroll container with themed scrollbars and optional overflow cues."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Scroll Area">
        A scroll container with a theme-styled scrollbar. Scrolls vertically, horizontally, or both.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <ScrollArea
                    showCues={values.cue !== 'none'}
                    blur={values.cue !== 'fade'}
                    tabindex={0}
                    role="region"
                    aria-label="Recent chats"
                    class={SURFACE}
                >
                    <ul class="m-0 flex list-none flex-col p-2">
                        {#each playgroundChats as chat (chat)}
                            <li class="truncate px-3 py-2 text-sm text-foreground-muted">
                                {chat}
                            </li>
                        {/each}
                    </ul>
                </ScrollArea>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add scroll-area" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            <InlineText
                text={"Put the scrolling content in `children` and give the area a height or maximum height with `class`; without one it grows to fit and never scrolls. `class` styles the outer shell; other attributes and `bind:element` go to the scroll viewport."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text>
            <InlineText
                text={"The viewport is not a tab stop by itself. When its content has no focusable controls, add `tabindex={0}`, `role=\"region\"`, and an `aria-label` so keyboard users can scroll it."}
            />
        </Typography.Text>
        <Typography.Text>
            <InlineText
                text={"A vertical scroll area fades its overflowing edges into the surface behind it and blurs the content passing under them. The cues update as content is inserted, removed, or resized. Pass `showCues={false}` to drop them, or `blur={false}` to keep the fade without a backdrop filter. The scrollbar thumb stays hidden until the area is hovered, focused, or scrolled."}
            />
        </Typography.Text>
        <Typography.Text>
            While its content overflows, a scroll area keeps the wheel to itself, so reaching the
            end does not scroll the page behind it. When everything fits, scrolling passes through
            to the page.
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="grouped-list" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Grouped list</Typography.H3>
            <Typography.Text variant="supporting">
                A chat history with date labels and a selected row scrolls inside a fixed height.
            </Typography.Text>
            <ComponentPreview code={GroupedListSrc}>
                <GroupedList />
            </ComponentPreview>
        </div>

        <div id="horizontal" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Horizontal</Typography.H3>
            <ComponentPreview code={HorizontalSrc}>
                <Horizontal />
            </ComponentPreview>
        </div>

        <div id="both-directions" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Both directions</Typography.H3>
            <ComponentPreview code={BothSrc}>
                <Both />
            </ComponentPreview>
        </div>

        <div id="edge-cue-blur" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Edge cue blur</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`blur={false}` keeps the fade without a backdrop filter, which is worth doing over long or animated content."}
                />
            </Typography.Text>
            <ComponentPreview code={BlurSrc}>
                <Blur />
            </ComponentPreview>
        </div>
    </section>
</div>
