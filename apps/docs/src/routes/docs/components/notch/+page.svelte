<script lang="ts">
    import { Settings01Icon as Settings } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Notch from '@mielui/svelte/components/notch';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import ViewportPreview from '#lib/components/docs/viewport-preview.svelte';
    import ActivitySrc from './examples/activity.svelte?raw';
    import GlassSrc from './examples/glass.svelte?raw';
    import HeroSrc from './examples/hero.svelte?raw';
    import PeekSrc from './examples/peek.svelte?raw';
    import {
        ACCESSORY_CLASS,
        code as playgroundCode,
        controls as playgroundControls
    } from './playground';

    let playgroundOpen = $state(false);

    function showPlayground() {
        playgroundOpen = true;
    }

    const usageSnippet = `<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Notch from '@mielui/svelte/components/notch';

    let open = $state(false);
<${'/'}script>

<Button onclick={() => (open = true)}>Sync</Button>
<Notch.Root bind:open>
    <Notch.Content aria-label="Sync status">
        <Notch.Header>
            <Notch.Title>Everything is synced</Notch.Title>
            <Notch.Description>Your files are available on every device.</Notch.Description>
        </Notch.Header>
    </Notch.Content>
</Notch.Root>`;

    const labelsSnippet = `<script lang="ts">
    import * as Notch from '@mielui/svelte/components/notch';
    import type { NotchLabels } from '@mielui/svelte/components/notch';

    const labels: NotchLabels = {
        close: 'Fermer la notification',
        expand: 'Ouvrir la notification'
    };
<${'/'}script>

<Notch.Root open {labels}>
    <Notch.Content aria-label="Synchronisation">
        <Notch.Title>Tout est synchronisé</Notch.Title>
        <Notch.Close />
    </Notch.Content>
</Notch.Root>`;
</script>

<svelte:head>
    <title>Mielui · Notch</title>
    <meta
        name="description"
        content="A nonmodal panel attached to a viewport edge for short updates and ongoing activity."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Notch">
        A small panel attached to a viewport edge. Show an update or ongoing activity while the page
        stays usable.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <Button variant="secondary" onclick={showPlayground}>Show notch</Button>
                <Notch.Root
                    bind:open={playgroundOpen}
                    side={values.side}
                    mode={values.mode}
                    surface={values.glass ? 'glass' : undefined}
                >
                    {#if values.sideAction !== 'none'}
                        <Notch.SideAction side={values.sideAction} aria-label="Sync settings">
                            <HugeiconsIcon icon={Settings} size={16} />
                        </Notch.SideAction>
                    {/if}
                    <Notch.Content
                        aria-label="Sync status"
                        class={values.side === 'left' || values.side === 'right'
                            ? 'w-44 justify-center px-5'
                            : undefined}
                    >
                        <Notch.Header>
                            <Notch.Title class="text-sm">All synced</Notch.Title>
                            {#if values.description}
                                <Notch.Description class="text-xs">
                                    Your files are up to date.
                                </Notch.Description>
                            {/if}
                        </Notch.Header>
                        {#if values.actions}
                            <Notch.Actions>
                                <Button variant="secondary" size="sm">View files</Button>
                            </Notch.Actions>
                        {/if}
                        {#if values.close}
                            <Notch.Close />
                        {/if}
                    </Notch.Content>
                    {#if values.accessory}
                        <Notch.Accessory class={ACCESSORY_CLASS} aria-label="3 of 3 files synced">
                            3 of 3
                        </Notch.Accessory>
                    {/if}
                </Notch.Root>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add notch" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `open` on Root and set it to true to show the notch. Content holds any children, stays centered on the `side` you choose, and animates as its size changes. Header, Title, Description, Actions, Close, SideAction, Accessory, and Peek are optional. Close, a swipe, Escape, and the timer all set the same `open` binding back to false."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Keep Root mounted while it closes so Content can finish its exit. Set the panel width with a width class on Content; a tall panel stays inside the viewport and scrolls. The panel renders in the top layer, above clipping ancestors, and keeps the theme variables it inherits."}
            />
        </Typography.Text>
        <CodeBlock lang="svelte" copy="overlay" code={usageSnippet} />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <Typography.H2 class="docs-section-heading">Examples</Typography.H2>

        <div id="each-edge" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Each edge</Typography.H3>
            <Typography.Text variant="supporting">
                One notch opened from each edge of its own viewport, with a taller layout on the
                left and right.
            </Typography.Text>
            <ComponentPreview code={HeroSrc} class="[&_[data-preview-canvas]]:p-0">
                <ViewportPreview example="notch/hero" title="Notch hero preview" />
            </ComponentPreview>
        </div>

        <div id="peek" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Peek</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`mode=\"peek\"` keeps a slim handle at the edge. Hover, focus, or tap it to expand the notch; it collapses once the pointer leaves and focus is outside. Peek, placed beside Content, replaces the handle with a short indicator."}
                />
            </Typography.Text>
            <ComponentPreview code={PeekSrc} class="[&_[data-preview-canvas]]:p-0">
                <ViewportPreview example="notch/peek" title="Notch peek preview" />
            </ComponentPreview>
        </div>

        <div id="side-action" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Side action and accessory</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"SideAction, placed beside Content, rests as an arc next to the panel and unfolds into a button when you hover or tap the panel or focus the action. Its `side` is `end` by default; on a top or bottom notch `start` and `end` mean left and right, on a side notch above and below. It is a [Button](/docs/components/button) with the `panel` variant and `icon` size, so it takes Button props; label it when it only holds an icon."}
                />
            </Typography.Text>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"Accessory floats a counter or hint outside the panel: below a top notch, above a bottom notch, or toward the page for a side notch. Hovering or focusing it pauses the timer, and it hides with the notch. Here the action expands a file list and the panel resizes to fit."}
                />
            </Typography.Text>
            <ComponentPreview code={ActivitySrc} class="[&_[data-preview-canvas]]:p-0">
                <ViewportPreview example="notch/activity" title="Notch activity preview" />
            </ComponentPreview>
        </div>

        <div id="glass" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Glass surface</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`surface=\"glass\"` on Root gives the panel a translucent, blurred background. Omit `surface` to inherit `--mielui-surface` from the theme, or set `surface=\"solid\"` to keep this panel opaque."}
                />
            </Typography.Text>
            <ComponentPreview code={GlassSrc} class="[&_[data-preview-canvas]]:p-0">
                <ViewportPreview example="notch/glass" title="Notch glass preview" />
            </ComponentPreview>
        </div>
    </section>

    <section id="dismissal" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Dismissal</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"A triggered notch closes on its own after `duration`, 5000 milliseconds by default. Hover and keyboard focus pause the countdown. Set `duration={0}` to keep it open until your application closes it."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Swiping toward the attached edge or pressing Escape while focus is inside also closes it; reversing a swipe before release keeps it open. On touch screens, start the swipe on Header so the body can still scroll. Add Close when the panel needs a visible dismiss button."}
            />
        </Typography.Text>
    </section>

    <section id="accessibility" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Focus and motion</Typography.H2>
        <Typography.Text variant="supporting">
            Notch is nonmodal. Opening it does not move focus, lock scrolling, or make the page
            inert. Use Dialog for a decision that must interrupt the current task.
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Title renders an `h2`; set `level` to fit the surrounding outline. Content does not announce updates on its own. Put a `role=\"status\"` message inside when an update needs a polite announcement, keep interactive controls outside it, and do not repeat the same announcement in Accessory."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            Entry, exit, and size changes use spring motion. Reduced motion settles the panel
            immediately. An interrupted exit reverses when open becomes true again.
        </Typography.Text>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Pass `labels` to Root to translate the accessible names of the close button and of the handle that expands a peeking notch. Every key of `NotchLabels` is optional; omitted keys keep the English text."}
            />
        </Typography.Text>
        <CodeBlock code={labelsSnippet} lang="svelte" copy="overlay" />
    </section>
</div>
