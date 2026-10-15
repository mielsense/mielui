<script lang="ts">
    import * as AlertDialog from '@mielui/svelte/components/alert-dialog';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import AsyncDeleteExample from './examples/async-delete.svelte';
    import AsyncDeleteExampleSrc from './examples/async-delete.svelte?raw';
    import Destructive from './examples/destructive.svelte';
    import DestructiveSrc from './examples/destructive.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import SignOut from './examples/sign-out.svelte';
    import SignOutSrc from './examples/sign-out.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usage = `<script lang="ts">
    import * as AlertDialog from '@mielui/svelte/components/alert-dialog';
    import Kbd from '@mielui/svelte/components/kbd';
</${'script'}>

<AlertDialog.Root error>
    <AlertDialog.Trigger variant="destructive">Delete</AlertDialog.Trigger>
    <AlertDialog.Content size="lg">
        <AlertDialog.Header>
            <AlertDialog.Title>Delete this project?</AlertDialog.Title>
            <AlertDialog.Description>This cannot be undone.</AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Exit>Cancel <Kbd shortcut="esc" /></AlertDialog.Exit>
            <AlertDialog.Confirm>Delete <Kbd shortcut="enter" /></AlertDialog.Confirm>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>`;
</script>

<svelte:head>
    <title>Mielui · Alert Dialog</title>
    <meta
        name="description"
        content="A dialog that interrupts the user to confirm a consequential action."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Alert Dialog">
        Confirm destructive or irreversible actions before proceeding.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <AlertDialog.Root error={values.error} orientation={values.orientation}>
                    <AlertDialog.Trigger variant="outline">Delete project</AlertDialog.Trigger>
                    <AlertDialog.Content
                        size={values.size}
                        surface={values.glass ? 'glass' : undefined}
                        allowEscape={values.allowEscape}
                    >
                        <AlertDialog.Header>
                            <AlertDialog.Title>Delete this project?</AlertDialog.Title>
                            {#if values.description}
                                <AlertDialog.Description>
                                    All branches, issues, and deploy history will be permanently
                                    removed.
                                </AlertDialog.Description>
                            {/if}
                        </AlertDialog.Header>
                        <AlertDialog.Footer>
                            <AlertDialog.Exit>Cancel</AlertDialog.Exit>
                            <AlertDialog.Confirm>Delete project</AlertDialog.Confirm>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog.Root>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add alert-dialog" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Confirm and Exit call `onclick` before closing. Call `event.preventDefault()` to keep the alert dialog open, or set `closeOnClick={false}` for asynchronous work. Both support `bind:element`. Focus starts on Exit when the dialog opens. Set `ariaBusy` on Content while a confirmation is pending."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The theme's `chrome.borders` setting chooses `single` or `double` framing. `single` is the default."}
            />
        </Typography.Text>
        <CodeBlock code={usage} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Common patterns for destructive actions and sign-out flows.
            {/snippet}
        </SectionHeading>

        <div id="workspace-deletion" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Workspace deletion</Typography.H3>
            <Typography.Text variant="supporting">
                The trigger and title carry an icon, and a status line reports the result.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="destructive" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Destructive confirmation</Typography.H3>
            <ComponentPreview code={DestructiveSrc}>
                <Destructive />
            </ComponentPreview>
        </div>

        <div id="sign-out" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Sign out confirmation</Typography.H3>
            <ComponentPreview code={SignOutSrc}>
                <SignOut />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Set `surface=\"glass\"` on Content for a translucent, blurred background. Omit `surface` to inherit `--mielui-surface` from the theme, or set `surface=\"solid\"` to override it. Glass falls back to an opaque surface when backdrop filtering is unavailable or reduced transparency is requested."}
            />
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
    <section id="keeping-it-open" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Keeping it open</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"An alert dialog never closes from a press outside. Escape still closes it. Set `allowEscape={false}` on Content when even that is too easy, such as a confirmation the person must read."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Confirm and Exit close the dialog after `onclick`. Call `event.preventDefault()` there to keep it open while you work, and show progress with `loading` and `labels`. `onOpenChange` on Root tells you each time it opens or closes, whichever way that happened."}
            />
        </Typography.Text>
        <ComponentPreview code={AsyncDeleteExampleSrc}>
            <AsyncDeleteExample />
        </ComponentPreview>
    </section>
    <section id="parts" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Buttons and text parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Trigger, Exit and Confirm are built on [Button](/docs/components/button), so they accept its props. `variant` and `size` change the look, `disabled` blocks activation, and `href` renders a link. `loading` shows a spinner and ignores clicks, and `labels` sets the text for each state. `unstyled` removes the Button classes so `class` alone styles the part. `onclick` and `onkeydown` run before the part does its own work. Confirm is destructive when Root has `error`."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Header, Title, Description and Footer render their `children` and take `class`."}
            />
        </Typography.Text>
    </section>
</div>
