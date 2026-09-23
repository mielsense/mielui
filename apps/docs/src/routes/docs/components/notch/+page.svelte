<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import ViewportPreview from '$lib/components/docs/viewport-preview.svelte';
    import ActivitySrc from './examples/activity.svelte?raw';
    import GlassSrc from './examples/glass.svelte?raw';
    import HeroSrc from './examples/hero.svelte?raw';
    import PeekSrc from './examples/peek.svelte?raw';
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
        <ComponentPreview code={HeroSrc} class="[&_[data-preview-canvas]]:p-0">
            <ViewportPreview example="notch/hero" title="Notch hero preview" />
        </ComponentPreview>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add notch" />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Bind open on Root. Content holds arbitrary children, stays centered on the chosen
            viewport edge, and animates as its content changes size. Header, Title, Description,
            Actions, Close, SideAction, and Accessory are optional. Close, swipe dismissal, and the
            automatic timer update the same open binding.
        </Typography.Text>
        <CodeBlock
            lang="svelte"
            copy="overlay"
            code={`import * as Notch from '$lib/mielui/components/notch';

<Notch.Root bind:open side="top">
    <Notch.Content aria-label="Sync status">
        <Notch.Header>
            <Notch.Title>Everything is synced</Notch.Title>
            <Notch.Description>Your files are available on every device.</Notch.Description>
        </Notch.Header>
    </Notch.Content>
</Notch.Root>`}
        />
        <Typography.Text variant="supporting">
            Keep Root mounted during dismissal so Content can finish its exit. Use a width class on
            Content to change the panel width. Content keeps long panels within the viewport and
            scrolls their contents. The native manual popover places the panel above clipping
            ancestors while preserving inherited theme variables.
        </Typography.Text>
    </section>
    <section id="behavior" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Triggered and peek modes</Typography.H2>
        <Typography.Text variant="supporting">
            Triggered mode starts hidden. Set open to true to reveal it. It dismisses after five
            seconds; hover and keyboard focus pause the countdown. Set duration to 0 to keep it open
            until your application closes it.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Swipe toward the attached edge or press Escape while focus is inside to dismiss it. On
            touch screens, start the swipe on Header so the body can still scroll. Add Close when
            the panel needs a visible dismiss button.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Peek mode keeps a slim handle at the edge. Hover, focus, or tap the handle to expand it.
            It collapses after the pointer leaves and focus is outside. Place Notch.Peek beside
            Content to replace the handle's contents with a short, noninteractive indicator.
        </Typography.Text>
        <ComponentPreview code={PeekSrc} class="[&_[data-preview-canvas]]:p-0">
            <ViewportPreview example="notch/peek" title="Notch peek preview" />
        </ComponentPreview>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        <div id="activity" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Detached controls</Typography.H3>
            <Typography.Text variant="supporting">
                Place SideAction beside Content inside Root. For top and bottom notches, start and
                end mean left and right. For left and right notches, they mean above and below.
                SideAction accepts Button props and children; label icon-only actions.
            </Typography.Text>
            <Typography.Text variant="supporting">
                The action rests as an arc beside the attached edge. Hover the panel, focus the
                action, or tap the panel to unfold the button. In this example, the button expands a
                file list and the panel resizes to fit.
            </Typography.Text>
            <ComponentPreview code={ActivitySrc} class="[&_[data-preview-canvas]]:p-0">
                <ViewportPreview example="notch/activity" title="Notch activity preview" />
            </ComponentPreview>
        </div>
        <div id="glass" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Glass surface</Typography.H3>
            <Typography.Text variant="supporting">
                Pass surface="glass" explicitly, or omit surface to follow the global glass setting
                from Studio. surface="solid" keeps this panel opaque.
            </Typography.Text>
            <ComponentPreview code={GlassSrc} class="[&_[data-preview-canvas]]:p-0">
                <ViewportPreview example="notch/glass" title="Notch glass preview" />
            </ComponentPreview>
        </div>
    </section>
    <section id="accessory" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Outside content</Typography.H2>
        <Typography.Text>
            Place Notch.Accessory beside Content inside Root for a counter, hint, or custom
            controls. It floats below a top notch, above a bottom notch, or toward the page for a
            side notch. The export example uses it for a file count.
        </Typography.Text>
        <Typography.Text>
            Accessory accepts normal div attributes and children. Hovering or focusing it pauses
            dismissal. Closing the notch hides the accessory too.
        </Typography.Text>
    </section>
    <section id="accessibility" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Focus and motion</Typography.H2>
        <Typography.Text variant="supporting">
            Notch is nonmodal. Opening it does not move focus, lock scrolling, or make the page
            inert. Its controls remain keyboard accessible. Escape closes it when focus is inside.
            Use Dialog for a decision that must interrupt the current task.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Title defaults to h2; set level to match the surrounding outline. Content does not
            announce every update automatically. Put a role="status" message inside when an update
            needs a polite announcement, and keep interactive controls outside that message.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Entry, exit, and size changes use spring motion. Reduced motion and the theme's
            zero-duration motion preset settle the panel immediately. An interrupted exit reverses
            when open becomes true again.
        </Typography.Text>
    </section>
    <section id="working-example" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Choose the right announcement</Typography.H2>
        <Typography.Text>
            Use Accessory for a compact count or hint outside the panel, and Content for the task
            itself. Avoid repeating the same live announcement in both regions. These examples run
            in isolated viewports so their edge placement stays inside the preview.
        </Typography.Text>
    </section>
</div>
