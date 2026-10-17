<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Popover from '@mielui/svelte/components/popover';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Basic from './examples/basic.svelte';
    import BasicSrc from './examples/basic.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Hover from './examples/hover.svelte';
    import HoverSrc from './examples/hover.svelte?raw';
    import Placements from './examples/placements.svelte';
    import PlacementsSrc from './examples/placements.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usageSnippet = `<script lang="ts">
    import * as Popover from '@mielui/svelte/components/popover';
<${'/'}script>

<Popover.Root>
    <Popover.Trigger>Open</Popover.Trigger>
    <Popover.Content class="w-64" aria-label="Details">Content here</Popover.Content>
</Popover.Root>`;
</script>

<svelte:head>
    <title>Mielui · Popover</title>
    <meta name="description" content="A floating surface anchored to a trigger element." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Popover">
        A floating surface anchored to a trigger. Place it on any side, optionally aligned to the
        start or end of the trigger.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <Popover.Root placement={values.placement} hoverable={values.hoverable}>
                    <Popover.Trigger
                        variant={values.variant}
                        size={values.size}
                        icon={values.icon}
                        disabled={values.disabled}
                    >
                        Notifications
                    </Popover.Trigger>
                    <Popover.Content
                        class="w-64"
                        aria-label={values.title ? undefined : 'Notifications'}
                        surface={values.glass ? 'glass' : undefined}
                    >
                        <div class="flex flex-col gap-3">
                            <div class="flex flex-col gap-1">
                                {#if values.title}
                                    <Popover.Title>Watching this project</Popover.Title>
                                {/if}
                                <p class="m-0 text-sm text-foreground-muted">
                                    We email you when a new release ships.
                                </p>
                            </div>
                            <Button variant="secondary" size="sm">Stop watching</Button>
                        </div>
                    </Popover.Content>
                </Popover.Root>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add popover" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `open` on Root when another control needs to open or close the panel. `onOpenChange` reports changes made inside the component; setting the bound value yourself does not call it. Each Root keeps its own state."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Content has a dialog role, so give it a Title or an `aria-label`. While a click popover is open, Tab stays inside the panel, the page does not scroll, and content outside it is inert. Set `focusTrap` and `lockScroll` to false on Content, and `inert={false}` on Root, when the rest of the page must stay usable."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Trigger `onclick` receives the native event before the open state changes. Call `preventDefault()` to cancel opening or closing."}
            />
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Place a panel beside its trigger or compose a form inside it.
            {/snippet}
        </SectionHeading>

        <div id="share-form" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Share form</Typography.H3>
            <Typography.Text variant="supporting">
                A form, a member list, and a status line composed inside one panel.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="basic" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Basic</Typography.H3>
            <ComponentPreview code={BasicSrc}>
                <Basic />
            </ComponentPreview>
        </div>

        <div id="placements" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Placements</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`placement` on Root picks a side and an optional `-start` or `-end` alignment. The panel flips when there is no room."}
                />
            </Typography.Text>
            <ComponentPreview code={PlacementsSrc}>
                <Placements />
            </ComponentPreview>
        </div>

        <div id="glass" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Glass surface</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`surface=\"glass\"` on Content gives the panel a translucent, blurred background. Omit `surface` to inherit `--mielui-surface` from the theme, or set `surface=\"solid\"` to override it. Glass falls back to an opaque fill when backdrop filtering is unavailable or reduced transparency is requested."}
                />
            </Typography.Text>
            <ComponentPreview code={GlassSrc}>
                <Glass />
            </ComponentPreview>
        </div>

        <div id="hover" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Open on hover</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`hoverable` on Root opens the popover when the pointer rests on the trigger, as well as on click. `delay` is how long the pointer has to rest, in milliseconds, and defaults to 0. `closeDelay` keeps the panel open after the pointer leaves, 150 ms by default, so people can move onto it. A hover popover does not trap focus, lock scrolling, or make the page inert."}
                />
            </Typography.Text>
            <ComponentPreview code={HoverSrc}>
                <Hover />
            </ComponentPreview>
        </div>
    </section>

    <section id="dismissal-and-layering" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Dismissal and layering</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"A click popover closes on Escape and on a press outside. `allowClickOutside={false}` on Content keeps it open until Escape or until you set `open` to false."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"While open, the popover puts an invisible layer over the page so the first outside press only closes it. Set `dismissLayer={false}` when the trigger has to stay usable while the panel is open, such as a text input that filters the panel. Outside presses still close the popover."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`portal` moves the panel to the end of the document so a parent with clipped overflow cannot cut it off. Set `portal={false}` to render it in place, for example inside a container you style with a container query."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`refElement` anchors the panel to another element or a virtual element in place of the trigger. The panel then opens to the right of that element, which is how submenus use it."}
            />
        </Typography.Text>
    </section>

    <section id="trigger-and-state" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Trigger and state</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Trigger is a Button and defaults to the `primary` variant. `icon` adds a chevron after the label that turns while the popover is open, and `unstyled` removes the Button classes. `onopen` runs just before this trigger opens the popover, which is the place to load the panel's data. Bind `element` to reach the button."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"On Content, `class` styles the outer frame and `surfaceClass` styles the inner surface where your children sit."}
            />
        </Typography.Text>
    </section>
</div>
