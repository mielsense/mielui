<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Dialog from '@mielui/svelte/components/dialog';
    import { Input } from '@mielui/svelte/components/input';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import AsyncConfirmExample from './examples/async-confirm.svelte';
    import AsyncConfirmExampleSrc from './examples/async-confirm.svelte?raw';
    import Basic from './examples/basic.svelte';
    import BasicSrc from './examples/basic.svelte?raw';
    import DestructiveExample from './examples/destructive.svelte';
    import DestructiveExampleSrc from './examples/destructive.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Nested from './examples/nested.svelte';
    import NestedSrc from './examples/nested.svelte?raw';
    import RequiredChoiceExample from './examples/required-choice.svelte';
    import RequiredChoiceExampleSrc from './examples/required-choice.svelte?raw';
    import Compact from './examples/size-compact.svelte';
    import CompactSrc from './examples/size-compact.svelte?raw';
    import Large from './examples/size-large.svelte';
    import LargeSrc from './examples/size-large.svelte?raw';
    import Wide from './examples/size-wide.svelte';
    import WideSrc from './examples/size-wide.svelte?raw';
    import WithSelect from './examples/with-select.svelte';
    import WithSelectSrc from './examples/with-select.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    let playgroundName = $state('Mielui docs');

    const installCommand = 'pnpm dlx @mielui/svelte add dialog';
</script>

<svelte:head>
    <title>Mielui · Dialog</title>
    <meta name="description" content="A dialog for focused tasks, forms, and details." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Dialog">
        Show a focused task, form, or details above the current page.
    </PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <Dialog.Root orientation={values.orientation} error={values.error}>
                    <Dialog.Trigger variant={values.trigger}>Rename project</Dialog.Trigger>
                    <Dialog.Content
                        size={values.size}
                        surface={values.glass ? 'glass' : undefined}
                        role={values.role}
                        showClose={values.showClose}
                        allowClickOutside={values.allowClickOutside}
                        allowEscape={values.allowEscape}
                    >
                        <Dialog.Header>
                            <Dialog.Title>Rename project</Dialog.Title>
                            {#if values.description}
                                <Dialog.Description>
                                    The new name shows up everywhere this project is listed.
                                </Dialog.Description>
                            {/if}
                        </Dialog.Header>
                        {#if values.body}
                            <Dialog.Body>
                                <Input bind:value={playgroundName} label="Project name" />
                            </Dialog.Body>
                        {/if}
                        {#if values.footer}
                            <Dialog.Footer>
                                <Dialog.Close>Cancel</Dialog.Close>
                                <Dialog.Confirm>Rename</Dialog.Confirm>
                            </Dialog.Footer>
                        {/if}
                    </Dialog.Content>
                </Dialog.Root>
            {/snippet}
        </Playground>
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
            Close and Confirm forward bind:element to their rendered control. Their click callback
            runs before dismissal and can cancel it with preventDefault.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Bind open on Root when another control needs to open or close the panel. Use
            onOpenChange to respond to changes initiated inside the component. Updating your bound
            value directly does not call that callback again. Each Root keeps its own state, so
            opening one instance does not change another.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Focus, Escape, and outside interactions are coordinated with nested overlays. Include a
            Title or give Content an aria-label. Description is optional; removing it also removes
            its accessible relationship. Trigger, Close, and Confirm click handlers can prevent the
            default state change with event.preventDefault().
        </Typography.Text>

        <CodeBlock
            code={`import * as Dialog from '@mielui/svelte/components/dialog';\nimport Kbd from '@mielui/svelte/components/kbd';\n\nlet open = $state(false);\n\n<Dialog.Root bind:open orientation="horizontal">\n  <Dialog.Trigger>Open</Dialog.Trigger>\n  <Dialog.Content>\n    <Dialog.Header>\n      <Dialog.Title>Title</Dialog.Title>\n    </Dialog.Header>\n    <Dialog.Footer>\n      <Dialog.Close>Cancel <Kbd shortcut="esc" /></Dialog.Close>\n      <Dialog.Confirm>Save <Kbd shortcut="enter" /></Dialog.Confirm>\n    </Dialog.Footer>\n  </Dialog.Content>\n</Dialog.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="form" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Form in a dialog</Typography.H3>
            <Typography.Text variant="supporting">
                A vertical dialog with an icon beside the title, one field, and shortcut hints on
                the actions.
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

        <div id="nested" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Nested</Typography.H3>
            <ComponentPreview code={NestedSrc}>
                <Nested />
            </ComponentPreview>
        </div>

        <div id="with-select" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With select</Typography.H3>
            <Typography.Text variant="supporting">
                A Select inside a dialog keeps its own layer: Escape closes the menu first and only
                then the dialog.
            </Typography.Text>
            <ComponentPreview code={WithSelectSrc}>
                <WithSelect />
            </ComponentPreview>
        </div>

        <div id="size-compact" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Compact</Typography.H3>
            <ComponentPreview code={CompactSrc}>
                <Compact />
            </ComponentPreview>
        </div>

        <div id="size-large" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Large</Typography.H3>
            <ComponentPreview code={LargeSrc}>
                <Large />
            </ComponentPreview>
        </div>

        <div id="size-wide" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Wide</Typography.H3>
            <ComponentPreview code={WideSrc}>
                <Wide />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on Dialog.Content for a translucent background with blur. Omit
            surface to inherit --mielui-surface from your theme, or set surface="solid" to override
            it. The glass surface keeps an opaque fallback when backdrop filtering is unavailable
            and respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
    <section id="dismissal" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Dismissal</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"A dialog closes four ways: the corner button, Escape, a press outside the panel, and its own Close or Confirm buttons. Content has a switch for each of the first three. `showClose={false}` removes the corner button, `allowEscape={false}` ignores Escape, and `allowClickOutside={false}` ignores presses on the backdrop."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Turn all three off when the person has to make a choice, and leave at least one button in the footer so they are never stuck."}
            />
        </Typography.Text>
        <ComponentPreview code={RequiredChoiceExampleSrc}>
            <RequiredChoiceExample />
        </ComponentPreview>
    </section>
    <section id="action-buttons" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Action buttons</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Close and Confirm close the dialog after their `onclick` runs. Call `event.preventDefault()` inside `onclick` to keep it open, then set `open` to false yourself when the work is done. Pair that with `loading` and `loadingLabel` so the button shows progress and ignores a second click."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Trigger, Close and Confirm are built on [Button](/docs/components/button), so they accept its props. `variant` and `size` change the look, `disabled` blocks activation, and `href` renders a link. `loading` shows a spinner and ignores clicks, and `loadingLabel`, `successLabel` and `errorLabel` set the text for each state. `unstyled` removes the Button classes so `class` alone styles the part. `onclick` and `onkeydown` run before the part does its own work. Confirm defaults to the primary variant and Close to ghost."}
            />
        </Typography.Text>
        <ComponentPreview code={AsyncConfirmExampleSrc}>
            <AsyncConfirmExample />
        </ComponentPreview>
    </section>
    <section id="destructive" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Destructive dialogs</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Set `error` on Root when confirming is destructive. Confirm switches to the destructive variant unless you pass your own `variant`, and browsers that tint their toolbar from the page's theme color turn it red while the dialog is open."}
            />
        </Typography.Text>
        <ComponentPreview code={DestructiveExampleSrc}>
            <DestructiveExample />
        </ComponentPreview>
    </section>
    <section id="styling-layers" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Styling the layers</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Content renders three nested layers and takes a class for each. `overlayClass` styles the backdrop, `contentClass` the positioned dialog element, and `surfaceClass` the inner surface that holds your parts. `class` goes on the frame between them. The `style` attribute lands on the same frame."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The panel gets an id built from `panelIdPrefix` and a generated suffix. Change the prefix when a test or an `aria-controls` elsewhere needs a predictable start."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Header, Title, Description, Body and Footer render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>
</div>
