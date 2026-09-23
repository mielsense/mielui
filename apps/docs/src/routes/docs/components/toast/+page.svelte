<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import ViewportPreview from '$lib/components/docs/viewport-preview.svelte';
    import ActionsSrc from './examples/actions.svelte?raw';
    import AllTypesSrc from './examples/all-types.svelte?raw';
    import CompositionSrc from './examples/composition.svelte?raw';
    import GlassSrc from './examples/glass.svelte?raw';
    import HeroSrc from './examples/hero.svelte?raw';
    import NotchSrc from './examples/notch.svelte?raw';

    import PromiseSrc from './examples/promise.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add toast';
</script>

<svelte:head>
    <title>Mielui · Toast</title>
    <meta name="description" content="Transient notifications fired from anywhere in your app." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Toast">
        A notification that stacks, auto-dismisses, and can carry an action.
    </PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc} class="[&_[data-preview-canvas]]:p-0">
            <ViewportPreview example="toast/hero" title="Toast hero preview" />
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
            The theme setting chrome.borders chooses "single" or "double" framing. Double is the
            default. Single removes the extra frame while preserving content padding, composition,
            and inset variants.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Mount Toaster once in your app layout, then fire notifications with toast. Descriptions
            appear in the upper inset; the footer contains the title and action buttons.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Changing duration restarts the dismissal countdown, while paused toasts remain paused.
            Persistent toasts have no dismissal timer. Promise results do not reopen a toast that
            was dismissed. Dismissal removes a toast from the active stack immediately; its local
            exit transition controls visual removal. Reduced motion skips that transition, and
            changing Toaster hosts does not replay exiting notifications.
        </Typography.Text>
        <CodeBlock
            code={`import { toast } from '$lib/mielui/components/toast';\n\ntoast.success('Profile updated', {\n  description: 'Your changes have been saved.'\n});\ntoast.error('Request failed', {\n  description: 'Could not connect.'\n});`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <section id="composition" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Composition</Typography.H2>
        <Typography.Text variant="supporting">
            Toast.Root accepts a toast object and optional children. Without children, it renders
            Content, Footer, Icon, Title, Actions, and Close. Compose these same parts to omit,
            reorder, or restyle a region. This example omits actions and the close button.
        </Typography.Text>
        <ComponentPreview code={CompositionSrc} class="[&_[data-preview-canvas]]:p-0">
            <ViewportPreview example="toast/composition" title="Toast composition preview" />
        </ComponentPreview>
        <Typography.Text variant="supporting">
            Content and Title display the toast description and title unless you supply children.
            Actions renders the configured actions or your own Toast.Action parts. Each Action takes
            an object with label, callback, and optional variant. Clicking it runs the callback and
            dismisses the toast.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Close sits at the top-right, with space reserved beside the content. Action and Close
            render buttons; all parts accept native attributes and class.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Use persistent: true for decisions that should wait for the user. Timed notifications
            pause while hovered or focused. Toast.Root alone does not register a timer or portal;
            Toaster handles those for notifications created with toast().
        </Typography.Text>
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Toast variants for different notification types.
            {/snippet}
        </SectionHeading>

        <div id="actions" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Action buttons</Typography.H3>
            <ComponentPreview code={ActionsSrc} class="[&_[data-preview-canvas]]:p-0">
                <ViewportPreview example="toast/actions" title="Toast actions preview" />
            </ComponentPreview>
        </div>

        <div id="promise" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Promise</Typography.H3>
            <Typography.Text variant="supporting">
                Pass a promise and loading, success, and error messages to toast.promise. One
                notification updates as the request settles. Success and error messages can be
                functions of the result or error. The helper returns the toast handle; await the
                original promise when subsequent work depends on it.
            </Typography.Text>
            <ComponentPreview code={PromiseSrc} class="[&_[data-preview-canvas]]:p-0">
                <ViewportPreview example="toast/promise" title="Toast promise preview" />
            </ComponentPreview>
        </div>
        <div id="types" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">All types</Typography.H3>
            <ComponentPreview code={AllTypesSrc} class="[&_[data-preview-canvas]]:p-0">
                <ViewportPreview example="toast/all-types" title="Toast all-types preview" />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on Toast.Root or pass surface: "glass" to toast(). Solid remains the
            default. The glass surface keeps an opaque fallback when backdrop filtering is
            unavailable and respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc} class="[&_[data-preview-canvas]]:p-0">
            <ViewportPreview example="toast/glass" title="Toast glass preview" />
        </ComponentPreview>
    </section>
    <section id="notch" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Notch notifications</Typography.H2>
        <Typography.Text variant="supporting">
            Mount one Toaster with variant="notch" to deliver notifications from the center of a
            screen edge. Choose top, bottom, left, or right with side. Calls to toast and
            toast.promise keep the same timers, actions, and dismissal behavior. Multiple
            notifications share the expanding surface. Pass surface: "glass" to toast to use a glass
            surface; otherwise the notch follows your global surface setting.
        </Typography.Text>
        <Typography.Text variant="supporting">
            The newest notification appears first. When several are active, previous and next
            actions unfold from arcs beside the notch on hover or focus. Switching items does not
            restart their timers.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Hover or focus pauses the selected item. Hidden items keep their original lifetimes.
            Escape or a swipe toward the attached edge dismisses only the selected notification.
        </Typography.Text>
        <ComponentPreview code={NotchSrc} class="[&_[data-preview-canvas]]:p-0">
            <ViewportPreview example="toast/notch" title="Notch notification preview" />
        </ComponentPreview>
        <Typography.Text variant="supporting">
            Replace your existing Toaster rather than adding a second host. The first mounted host
            owns notifications. For custom live activity content, compose the<a
                class="underline underline-offset-4"
                href="/docs/components/notch"
            >
                Notch component
            </a> directly.
        </Typography.Text>
    </section>
    <section id="preview-behavior" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Try each notification in place</Typography.H2>
        <Typography.Text>
            Each example has its own viewport and Toaster. Notifications stay inside that preview,
            including promise updates and edge notches. In your app, mount one Toaster in the root
            layout and call toast from the components that own each action.
        </Typography.Text>
    </section>
</div>
