<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
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
</script>
<svelte:head>
    <title>Mielui · Drawer</title>
    <meta
        name="description"
        content="Swipeable edge panel with accessible focus management and direct manipulation."
    />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Drawer">
        Swipeable edge panel with accessible focus management and direct manipulation.
    </PageIntro>
    <section id="hero" class="flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>

    <section id="installation" class="flex flex-col gap-4">
        <Typography.H2>Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add drawer" />
    </section>
    <section id="usage" class="flex flex-col gap-4">
        <Typography.H2>Usage</Typography.H2>
        <Typography.Text>
            Compose Root, Trigger, Portal, Overlay, and Content. Inside Content, add any combination
            of Handle, Header, Title, Description, Body, Footer, and Close. Regions are independent:
            omit Handle for a plain swipeable panel, or move Close into Header. Always provide Title
            or an aria-label on Content.
        </Typography.Text>
        <CodeBlock
            code={`import * as Drawer from '@mielui/svelte/components/drawer';\nimport { Button } from '@mielui/svelte/components/button';\n\nlet open = $state(false);\n\n<Drawer.Root bind:open direction="bottom">\n  <Drawer.Trigger>Open</Drawer.Trigger>\n  <Drawer.Portal>\n    <Drawer.Overlay />\n    <Drawer.Content>\n      <Drawer.Handle />\n      <Drawer.Header>\n        <Drawer.Title>Title</Drawer.Title>\n        <Drawer.Description>Describe what lives here.</Drawer.Description>\n      </Drawer.Header>\n      <Drawer.Body>Panel content</Drawer.Body>\n      <Drawer.Footer>\n        <Drawer.Close>Cancel</Drawer.Close>\n        <Button>Save</Button>\n      </Drawer.Footer>\n    </Drawer.Content>\n  </Drawer.Portal>\n</Drawer.Root>`}
            lang="svelte"
            copy="overlay"
        />
        <Typography.Text>
            The panel floats a small gap away from the edge it opens from, with all four corners
            rounded. Top and bottom drawers are centered and capped at a readable width; left and
            right drawers fill the height. Set a width class on Content to change the size, for
            example w-3xl, or w-screen for a panel as wide as the viewport allows.
        </Typography.Text>
        <Typography.Text>
            Content uses the same frame as Dialog and Sheet. Handle, Header, and Body sit on the
            inner surface. Footer renders on the outer frame below it, wherever you place it inside
            Content. Close is a ghost button that moves to the start of the footer, so the other
            actions line up at the end. The theme setting chrome.borders chooses single or double
            framing.
        </Typography.Text>
        <Typography.Text>
            Use bind:open or onOpenChange to control visibility. Set direction to bottom, top, left,
            or right. handleOnly restricts dragging to the handle; closeThreshold controls the
            dismissal distance.
        </Typography.Text>
        <Typography.Text>
            Drawers are modal. Focus moves to the panel itself when it opens, so no control looks
            selected and no keyboard appears on touch devices; Tab reaches the first control. Focus
            returns to the trigger on close. Escape and outside interaction dismiss the drawer
            unless dismissible is false. Include a Close button for keyboard users. Use
            onOpenAutoFocus on Content to focus something else.
        </Typography.Text>
        <Typography.Text>
            Set nested on a drawer inside another drawer. Its backdrop appears above the parent.
            Closing it returns focus to its trigger in the parent panel. Native regions support
            bind:element.
        </Typography.Text>
        <Typography.Text>
            Handle follows the direction: a bar at the top of a bottom drawer, at the bottom of a
            top drawer, and on the inner edge of a side drawer. Scrollable content belongs in Body.
            Add data-vaul-no-drag to custom controls that need their own pointer gestures.
            Snap-point expansion is not part of the supported API.
        </Typography.Text>
        <Typography.Text>
            Reduced motion removes opening and settling animations while preserving dragging. Use
            Sheet when the panel does not need swipe gestures.
        </Typography.Text>
    </section>
    <section id="directions" class="flex flex-col gap-4">
        <Typography.H2>Directions</Typography.H2>
        <Typography.Text>
            One drawer opened from each edge. The handle and the swipe direction follow the edge.
        </Typography.Text>
        <ComponentPreview code={SidesSrc}><Sides /></ComponentPreview>
    </section>
    <section id="nested" class="flex flex-col gap-4">
        <Typography.H2>Nested review</Typography.H2>
        <Typography.Text>
            Open the details from the review panel. Close the details to return to the review; each
            drawer has its own handle and close action.
        </Typography.Text>
        <ComponentPreview code={NestedSrc}><Nested /></ComponentPreview>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2>Glass surface</Typography.H2>
        <Typography.Text>
            Set surface="glass" on Content for a translucent frame with blur. Omit surface to
            inherit --mielui-surface from your theme, or set surface="solid" to override it. The
            glass surface keeps an opaque fallback when backdrop filtering is unavailable and
            respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
    <section id="dismissal-and-focus" class="flex flex-col gap-4">
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
    <section id="mounting-and-parts" class="flex flex-col gap-4">
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
                text={"Root, Trigger, Close, Content, Overlay, Portal, Handle, Header, Title, Description, Body and Footer render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>
</div>
