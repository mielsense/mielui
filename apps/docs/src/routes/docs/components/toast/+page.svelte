<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Actions from './examples/actions.svelte';
    import ActionsSrc from './examples/actions.svelte?raw';
    import AllTypes from './examples/all-types.svelte';
    import AllTypesSrc from './examples/all-types.svelte?raw';
    import Composition from './examples/composition.svelte';
    import CompositionSrc from './examples/composition.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add toast';
</script>

<svelte:head>
    <title>Mielui · Toast</title>
    <meta name="description" content="Transient notifications fired from anywhere in your app." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>Toast</Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                A notification that stacks, auto-dismisses, and can carry an action.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>

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
            Changing duration restarts the dismissal countdown, while paused toasts remain paused.
            Persistent toasts have no dismissal timer. Promise results do not reopen a toast that
            was dismissed. Dismissal removes a toast from the active stack immediately; its local
            exit transition controls visual removal. Reduced motion skips that transition, and
            changing Toaster hosts does not replay exiting notifications.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Mount Toaster once in your app layout, then fire notifications with toast. Descriptions
            appear in the upper inset; the footer contains the title and action buttons.
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
        <ComponentPreview code={CompositionSrc}><Composition /></ComponentPreview>
        <Typography.Text variant="supporting">
            Content and Title use the toast description and title unless you supply children.
            Actions renders the toast actions, or your own Toast.Action parts. Each Action takes an
            action object with label, callback, and optional variant. It runs the callback and then
            dismisses the toast. Close uses the toast exit callback. All parts accept native element
            attributes and class. Action and Close render buttons.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Use persistent: true for decisions that should wait for the user. Timed notifications
            pause while hovered or focused. Toast.Root alone does not register a timer or portal;
            Toaster handles those for notifications created with toast(). The previous standalone
            Toast component is now Toast.Root.
        </Typography.Text>
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
            <Typography.Text variant="supporting" class="mt-2">
                Toast variants for different notification types.
            </Typography.Text>
        </div>

        <div id="actions" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Action buttons</Typography.H3>
            <ComponentPreview code={ActionsSrc}><Actions /></ComponentPreview>
        </div>

        <div id="types" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">All types</Typography.H3>
            <ComponentPreview code={AllTypesSrc}>
                <AllTypes />
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
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
</div>
