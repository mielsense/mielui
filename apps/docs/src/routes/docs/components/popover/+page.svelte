<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Basic from './examples/basic.svelte';
    import BasicSrc from './examples/basic.svelte?raw';
    import Glass from './examples/glass.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import HoverExample from './examples/hover.svelte';
    import HoverExampleSrc from './examples/hover.svelte?raw';
    import Placements from './examples/placements.svelte';
    import PlacementsSrc from './examples/placements.svelte?raw';

    const GlassSrc = HeroSrc.replace(
        "let { surface }: { surface?: 'solid' | 'glass' } = $props();",
        "const surface = 'glass';"
    );

    const installCommand = 'pnpm dlx @mielui/svelte add popover';
</script>

<svelte:head>
    <title>Mielui · Popover</title>
    <meta name="description" content="A floating surface anchored to a trigger element." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Popover">
        A floating surface anchored to a trigger. Place it on any side, optionally aligned to the
        start or end of the trigger.
    </PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}>
            <Hero />
        </ComponentPreview>
    </section>

    <!-- ─── Installation ──────────────────────────────────────────── -->
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            The theme setting chrome.borders chooses "single" or "double" framing. Single is the
            default. Single removes the extra frame while preserving content padding, composition,
            and inset variants.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Trigger onclick receives the native mouse event before changing open state. Call
            preventDefault to cancel opening or closing.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Bind open on Root when another control needs to open or close the panel. Use
            onOpenChange to respond to changes initiated inside the component. Updating your bound
            value directly does not call that callback again. Each Root keeps its own state, so
            opening one instance does not change another.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Popover coordinates focus and Escape with dialogs and nested floating controls. Include
            Title or give Content an aria-label when it has a dialog role. Set focusTrap and
            lockScroll to false for a non-modal composition; set inert to false on Root when outside
            content should remain interactive.
        </Typography.Text>

        <Typography.Text variant="supporting">
            Open non-hover popovers make outside document content inert by default. Set
            <Typography.InlineCode>{'inert={false}'}</Typography.InlineCode>
            on{' '}
            <Typography.InlineCode>Popover.Root</Typography.InlineCode>
            only when the surrounding page must remain interactive.
        </Typography.Text>
        <CodeBlock
            code={`import * as Popover from '@mielui/svelte/components/popover';\n\n<Popover.Root>\n  <Popover.Trigger>Open</Popover.Trigger>\n  <Popover.Content class="w-64" aria-label="Details">\n    Content here\n  </Popover.Content>\n</Popover.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Place a panel beside its trigger or compose a form inside it.
            {/snippet}
        </SectionHeading>

        <!-- Basic popover -->
        <div id="basic" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Basic popover</Typography.H3>
            <ComponentPreview code={BasicSrc}>
                <Basic />
            </ComponentPreview>
        </div>

        <!-- Placement variants -->
        <div id="placements" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Placement variants</Typography.H3>
            <ComponentPreview code={PlacementsSrc}>
                <Placements />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on Popover.Content for a translucent background with blur. Omit
            surface to inherit --mielui-surface from your theme, or set surface="solid" to override
            it. The glass surface keeps an opaque fallback when backdrop filtering is unavailable
            and respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
    <section id="hover" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Opening on hover</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Set `hoverable` on Root to open the popover when the pointer rests on the trigger as well as on click. `delay` is how long the pointer has to rest, in milliseconds, and defaults to 0. `closeDelay` is how long the panel stays after the pointer leaves, 150 by default, which gives people time to move onto it."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"A hover popover does not lock scrolling or block the rest of the page."}
            />
        </Typography.Text>
        <ComponentPreview code={HoverExampleSrc}>
            <HoverExample />
        </ComponentPreview>
    </section>
    <section id="dismissal-and-layering" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Dismissal and layering</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"A click popover closes on a press outside. `allowClickOutside={false}` on Content keeps it open until you set `open` to false or the person presses Escape."}
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
    <section id="trigger-and-state" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Trigger and state</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Trigger is a Button with a chevron. `icon={false}` hides the chevron, `unstyled` removes the Button classes, and `style` sets inline styles. `onopen` runs just before this trigger opens the popover, which is the place to load the panel's data."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Each Root keeps its state under a key. Pass `stateKey` to choose that key yourself. `state_key` is the older spelling and still works. Content takes `surfaceClass` for the inner surface where your children sit, while `class` styles the outer frame, and `tabindex` sets the panel's tab index."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Content and Title render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>
</div>
