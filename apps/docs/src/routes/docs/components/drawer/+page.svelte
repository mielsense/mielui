<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Drawer from '@mielui/svelte/components/drawer';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import DismissalExample from './examples/dismissal.svelte';
    import DismissalExampleSrc from './examples/dismissal.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Nested from './examples/nested.svelte';
    import NestedSrc from './examples/nested.svelte?raw';
    import Sides from './examples/sides.svelte';
    import SidesSrc from './examples/sides.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    let playgroundOpen = $state(false);
    let unreadOnly = $state(true);
    let showArchived = $state(false);

    function applyPlayground() {
        playgroundOpen = false;
    }

    const usageCode = `<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Drawer from '@mielui/svelte/components/drawer';

    let open = $state(false);
</${'script'}>

<Drawer.Root bind:open>
    <Drawer.Trigger>Open</Drawer.Trigger>
    <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content>
            <Drawer.Handle />
            <Drawer.Header>
                <Drawer.Title>Title</Drawer.Title>
                <Drawer.Description>Describe what lives here.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body>Panel content</Drawer.Body>
            <Drawer.Footer>
                <Drawer.Close>Cancel</Drawer.Close>
                <Button>Save</Button>
            </Drawer.Footer>
        </Drawer.Content>
    </Drawer.Portal>
</Drawer.Root>`;
</script>

<svelte:head>
    <title>Mielui · Drawer</title>
    <meta
        name="description"
        content="A modal panel that slides in from an edge of the screen and can be swiped away."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Drawer">
        A modal panel that slides in from an edge of the screen and can be swiped away.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <Drawer.Root
                    bind:open={playgroundOpen}
                    direction={values.direction}
                    dismissible={values.dismissible}
                >
                    <Drawer.Trigger>Filters</Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay />
                        <Drawer.Content surface={values.glass ? 'glass' : undefined}>
                            {#if values.handle}
                                <Drawer.Handle />
                            {/if}
                            <Drawer.Header>
                                <Drawer.Title>Filters</Drawer.Title>
                                {#if values.description}
                                    <Drawer.Description>
                                        Choose what appears in your reading list.
                                    </Drawer.Description>
                                {/if}
                            </Drawer.Header>
                            <Drawer.Body class="flex flex-col gap-4">
                                <Switch bind:checked={unreadOnly} label="Unread only" />
                                <Switch bind:checked={showArchived} label="Show archived" />
                            </Drawer.Body>
                            <Drawer.Footer>
                                <Drawer.Close>Close</Drawer.Close>
                                <Button onclick={applyPlayground}>Apply</Button>
                            </Drawer.Footer>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add drawer" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Compose Root, Trigger, Portal, Overlay, and Content. Inside Content, use any of Handle,
            Header, Title, Description, Body, Footer, and Close. Each part is optional: omit Handle
            for a plain panel, or move Close into Header. Always give the drawer a Title, or an
            aria-label on Content.
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            <InlineText
                text={"Set `direction` on Root to `bottom` (the default), `top`, `left`, or `right`. Top and bottom drawers are centered and capped at a readable width; side drawers fill the height. Put a width class on Content to change the size, such as `w-3xl`."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Content uses the same frame as Dialog and Sheet. Footer renders below the inner surface wherever you place it, and Close moves to the start of the footer so the other actions line up at the end. The theme's `chrome.borders` setting chooses single or double framing."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `open` or use `onOpenChange` to control visibility. `handleOnly` limits dragging to the Handle and `closeThreshold` sets how far the panel must be dragged before it closes. Scrollable content belongs in Body; add `data-vaul-no-drag` to controls with their own pointer gestures, such as a slider."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Focus moves to the panel when it opens and returns to the trigger when it closes. Escape and outside presses close the drawer unless `dismissible` is false; keep a Close button for keyboard users. Reduced motion removes the open and settle animations but keeps dragging. Use [Sheet](/docs/components/sheet) when the panel does not need swipe gestures."}
            />
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="reading-preferences" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Reading preferences</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"A settings drawer with `handleOnly` that restores the saved values when it is dismissed."}
                />
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="directions" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Directions</Typography.H3>
            <Typography.Text variant="supporting">
                One drawer opened from each edge. The handle and the swipe direction follow the
                edge.
            </Typography.Text>
            <ComponentPreview code={SidesSrc}>
                <Sides />
            </ComponentPreview>
        </div>

        <div id="nested" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Nested</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"Set `nested` on a drawer inside another drawer. Its backdrop sits above the parent, and closing it returns focus to its trigger in the parent panel."}
                />
            </Typography.Text>
            <ComponentPreview code={NestedSrc}>
                <Nested />
            </ComponentPreview>
        </div>

        <div id="glass" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Glass surface</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"Set `surface=\"glass\"` on Content for a translucent frame with blur. Omit `surface` to inherit `--mielui-surface` from the theme, or set `surface=\"solid\"` to override it. Glass keeps an opaque fallback when backdrop filtering is unavailable and respects reduced-transparency preferences."}
                />
            </Typography.Text>
            <ComponentPreview code={GlassSrc}>
                <Glass />
            </ComponentPreview>
        </div>
    </section>

    <section id="dismissal-and-focus" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Dismissal and focus</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Content decides what happens when someone presses outside or hits Escape. `interactOutsideBehavior` and `escapeKeydownBehavior` each take `close`, `ignore`, `defer-otherwise-close`, or `defer-otherwise-ignore`. The two defer values hand the decision to a parent layer first, which is what a nested drawer wants. `onInteractOutside` and `onEscapeKeydown` run for each event, and calling `preventDefault()` there keeps the drawer open that one time."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`trapFocus={false}` lets Tab leave the drawer. `onCloseAutoFocus` runs when focus is about to return to the trigger, and preventing it lets you send focus somewhere else. `preventOverflowTextSelection` stops a text selection that starts inside from spreading onto the page."}
            />
        </Typography.Text>
        <ComponentPreview code={DismissalExampleSrc}>
            <DismissalExample />
        </ComponentPreview>
    </section>

    <section id="mounting-and-parts" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Mounting and parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`forceMount` on Content and Overlay keeps them in the DOM while closed, for when you run your own exit animation. `restoreScrollDelay` is the wait in milliseconds before page scrolling comes back after closing, and should be longer than that animation. Portal takes `disabled` to render the drawer in place instead of at the end of the document."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"On phones, `repositionInputs` on Root moves the drawer so the on-screen keyboard does not cover a focused field. Set it to false to fall back to the browser's own scrolling. Title renders a heading and `level` picks which one, from 1 to 6."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Trigger, Close, Content, Overlay, Handle, Title, Description, Header, Body and Footer accept `class` and `style`, and support `bind:element` for the rendered DOM node."}
            />
        </Typography.Text>
    </section>
</div>
