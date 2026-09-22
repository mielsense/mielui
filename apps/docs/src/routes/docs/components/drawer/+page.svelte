<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
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
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>Drawer</Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                Swipeable edge panel with accessible focus management and direct manipulation.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>
    <section id="hero" class="flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>

    <section id="nested" class="flex flex-col gap-4">
        <Typography.H2>Nested review</Typography.H2>
        <Typography.Text>
            Open the details from the review panel. Close the details to return to the review; each
            drawer has its own handle and close action.
        </Typography.Text>
        <ComponentPreview code={NestedSrc}><Nested /></ComponentPreview>
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
            Top and bottom panels span the viewport; constrain individual regions to keep their
            content readable. You can omit Handle for a plain swipeable panel, move Close into
            Header, or restyle Content with class. Always provide Title or an aria-label on Content.
        </Typography.Text>
        <Typography.Text>
            Root supports bind:open, onOpenChange, direction (bottom, top, left, right),
            dismissible, handleOnly, closeThreshold, and nested. Use nested on a Root inside another
            drawer. Nested panels keep their own backdrop above the parent and return focus to the
            parent trigger when closed. Focus enters the panel and returns to its trigger; Escape
            and outside interaction dismiss it unless dismissible is false. Drawers are modal. Keep
            an explicit Close action available for keyboard users. Content forwards Bits focus and
            outside-interaction callbacks, and native regions support bind:element.
        </Typography.Text>
        <Typography.Text>
            Handle supports dragging; use Close for keyboard dismissal. Scrollable content belongs
            in Body. Add data-vaul-no-drag to custom controls that need their own pointer gestures.
            Snap-point expansion is not part of the supported API.
        </Typography.Text>
        <Typography.Text>
            Vaul supplies gesture geometry while Mielui supplies surface styles and shared motion
            durations. Reduced motion removes opening and settling animation without removing direct
            manipulation. Drawer uses the pinned Svelte 5 Vaul prerelease; Sheet remains the
            side-panel option when swipe interaction is unnecessary.
        </Typography.Text>
    </section>
</div>
