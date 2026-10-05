<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Nested from './examples/nested.svelte';
    import NestedSrc from './examples/nested.svelte?raw';
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
            of Handle, Header, Title, Description, Body, Footer, and Close. Regions are independent.
            Top and bottom panels span the viewport; constrain individual regions to keep their
            content readable. You can omit Handle for a plain swipeable panel, move Close into
            Header, or restyle Content with class. Always provide Title or an aria-label on Content.
        </Typography.Text>
        <CodeBlock
            code={`import * as Drawer from '@mielui/svelte/components/drawer';\nimport { Button } from '@mielui/svelte/components/button';\n\nlet open = $state(false);\n\n<Drawer.Root bind:open direction="bottom">\n  <Drawer.Trigger>Open</Drawer.Trigger>\n  <Drawer.Portal>\n    <Drawer.Overlay />\n    <Drawer.Content>\n      <Drawer.Handle />\n      <Drawer.Header>\n        <Drawer.Title>Title</Drawer.Title>\n        <Drawer.Description>Describe what lives here.</Drawer.Description>\n      </Drawer.Header>\n      <Drawer.Body>Panel content</Drawer.Body>\n      <Drawer.Footer>\n        <Drawer.Close>Cancel</Drawer.Close>\n        <Button>Save</Button>\n      </Drawer.Footer>\n    </Drawer.Content>\n  </Drawer.Portal>\n</Drawer.Root>`}
            lang="svelte"
            copy="overlay"
        />
        <Typography.Text>
            Content uses the same frame as Dialog and Sheet. Handle, Header, and Body sit on the
            inner surface. Footer renders on the outer frame below it, wherever you place it inside
            Content. Close is a ghost button that moves to the start of the footer, so the other
            actions line up at the end. The frame stays flush with the viewport edge the drawer
            opens from and shows its inset only on the exposed edges. The theme setting
            chrome.borders chooses single or double framing.
        </Typography.Text>
        <Typography.Text>
            Use bind:open or onOpenChange to control visibility. Set direction to bottom, top, left,
            or right. handleOnly restricts dragging to the handle; closeThreshold controls the
            dismissal distance.
        </Typography.Text>
        <Typography.Text>
            Drawers are modal. Focus enters the panel and returns to the trigger when it closes.
            Escape and outside interaction dismiss it unless dismissible is false. Include a Close
            button for keyboard users.
        </Typography.Text>
        <Typography.Text>
            Set nested on a drawer inside another drawer. Its backdrop appears above the parent.
            Closing it returns focus to its trigger in the parent panel. Native regions support
            bind:element. Content accepts focus and outside-interaction callbacks.
        </Typography.Text>
        <Typography.Text>
            Handle supports dragging; use Close for keyboard dismissal. Scrollable content belongs
            in Body. Add data-vaul-no-drag to custom controls that need their own pointer gestures.
            Snap-point expansion is not part of the supported API.
        </Typography.Text>
        <Typography.Text>
            Reduced motion removes opening and settling animations while preserving dragging. Use
            Sheet when the panel does not need swipe gestures.
        </Typography.Text>
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
</div>
