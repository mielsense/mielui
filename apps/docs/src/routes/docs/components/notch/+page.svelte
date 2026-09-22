<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
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
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>Notch</Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                A small panel attached to a viewport edge. Show an update or ongoing activity while
                the page stays usable.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc} class="[&_[tabindex]]:p-0">
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
            seconds; hover and keyboard focus pause the countdown. Set duration to 0 for an activity
            that stays until your application closes it. Swipe toward its attached edge or press
            Escape while focused inside to dismiss it. On touch screens, start the swipe on Header
            so the body can still scroll. Close is optional; these examples omit it.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Peek mode keeps a slim handle at the edge. Hover, focus, or tap the handle to expand it.
            It collapses after the pointer leaves and focus is outside. Place Notch.Peek beside
            Content to replace the handle's contents with a short, noninteractive indicator.
        </Typography.Text>
        <ComponentPreview code={PeekSrc} class="[&_[tabindex]]:p-0">
            <ViewportPreview example="notch/peek" title="Notch peek preview" />
        </ComponentPreview>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        <div id="activity" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Detached controls</Typography.H3>
            <Typography.Text variant="supporting">
                SideAction sits beside Content as a sibling under Root. Its start and end positions
                are left and right for top or bottom panels, and above and below for lateral panels.
                It accepts Button props and children. Give icon-only actions an accessible label.
                The detached action rests as a curved arc beside the attached edge. Hover the panel
                or focus the action to unfold its button. Tap the panel on touch screens. The button
                expands a file list while the panel follows its size.
            </Typography.Text>
            <ComponentPreview code={ActivitySrc} class="[&_[tabindex]]:p-0">
                <ViewportPreview example="notch/activity" title="Notch activity preview" />
            </ComponentPreview>
        </div>
        <div id="glass" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Glass surface</Typography.H3>
            <Typography.Text variant="supporting">
                Pass surface="glass" explicitly, or omit surface to follow the global glass setting
                from Studio. surface="solid" keeps this panel opaque.
            </Typography.Text>
            <ComponentPreview code={GlassSrc} class="[&_[tabindex]]:p-0">
                <ViewportPreview example="notch/glass" title="Notch glass preview" />
            </ComponentPreview>
        </div>
    </section>
    <section id="accessory" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Outside content</Typography.H2>
        <Typography.Text>
            Place Notch.Accessory beside Content inside Root for a counter, hint, or custom
            controls. It stays centered just outside the body: below a top notch, above a bottom
            notch, or toward the page for either side. The export activity example uses it for a
            file count. Accessory accepts normal div attributes and children. Hovering or focusing
            it pauses dismissal; closing the notch hides it with the other parts.
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
</div>
