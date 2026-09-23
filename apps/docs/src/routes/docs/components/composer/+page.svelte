<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';

    import Glass from './examples/glass.svelte';
    import GlassSource from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Idle from './examples/idle.svelte';
    import IdleSrc from './examples/idle.svelte?raw';
    import ErrorExample from './examples/state-error.svelte';
    import ErrorSrc from './examples/state-error.svelte?raw';
    import Submitting from './examples/submitting.svelte';
    import SubmittingSrc from './examples/submitting.svelte?raw';
    import ToolbarInset from './examples/toolbar-inset.svelte';
    import ToolbarInsetSrc from './examples/toolbar-inset.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add composer';
</script>

<svelte:head>
    <title>Mielui · Composer</title>
    <meta
        name="description"
        content="A composable prompt input with actions, submission state, and keyboard behavior built in."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Composer">
        A prompt input that grows with its content and tracks submission state.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Bind the prompt value on Root and handle submission with onSubmit. Composer waits for
            async handlers and shows the submitting state until they finish. Submit labels its icon
            as Send, Queue message, or Stop response to match the current action.
        </Typography.Text>
        <Typography.Text variant="supporting">
            If submission rejects, Composer preserves the prompt and shows errorMessage. Use onError
            to report the failure, then retry with the same submit button. If you set status="error"
            yourself, your application must clear it.
        </Typography.Text>
        <CodeBlock
            code={`import * as Composer from '@mielui/svelte/components/composer';

let value = $state('');

async function sendPrompt(prompt: string) {
  await saveMessage(prompt);
  value = '';
}

<Composer.Root bind:value onSubmit={sendPrompt} onError={reportError}>
  <Composer.Input placeholder="Ask anything..." />
  <Composer.Toolbar>
    <Composer.Actions>
      <!-- Add attachment, model, or permission controls here. -->
    </Composer.Actions>
    <Composer.Submit />
  </Composer.Toolbar>
</Composer.Root>`}
            lang="svelte"
            copy="overlay"
        />
        <Typography.Text variant="supporting">
            By default,<Kbd shortcut="enter" /> submits and
            <Kbd shortcut="shift+enter" />
            inserts a new line. Set
            <Typography.InlineCode>submitOnEnter={false}</Typography.InlineCode>
            on
            <Typography.InlineCode>Input</Typography.InlineCode>
            when Enter should always create a new line.
        </Typography.Text>
    </section>

    <section id="glass-surface" class="flex flex-col gap-4">
        <Typography.H2>Glass surface</Typography.H2>
        <Typography.Text>
            Set surface="glass" on Composer.Root for a frosted frame with a darker input well. Solid
            is used unless the theme enables glass globally.
        </Typography.Text>
        <ComponentPreview code={GlassSource}><Glass /></ComponentPreview>
    </section>
    <section id="integration" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Submission and cancellation</Typography.H2>
        <Typography.Text variant="supporting">
            Return a promise from onSubmit to keep the submit control pending until your request
            settles. Reject it to preserve the prompt and display errorMessage. Use controlled
            status="submitting" or generating for a stoppable response. onStop must cancel your
            request or timer; it does not cancel application work automatically. The examples below
            include a real stop action and a failure you can retry.
        </Typography.Text>
    </section>
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Send a prompt, stop pending work, and retry a failed submission.
            {/snippet}
        </SectionHeading>

        <div id="idle" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Idle</Typography.H3>
            <ComponentPreview code={IdleSrc}><Idle /></ComponentPreview>
        </div>

        <div id="submitting" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Submitting</Typography.H3>
            <ComponentPreview code={SubmittingSrc}><Submitting /></ComponentPreview>
        </div>

        <div id="error" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Error</Typography.H3>
            <ComponentPreview code={ErrorSrc} refreshable><ErrorExample /></ComponentPreview>
        </div>

        <div id="toolbar-inset" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Toolbar inset</Typography.H3>
            <Typography.Text variant="supporting">
                The toolbar defaults to the frame chrome outside the input well. Set
                <Typography.InlineCode>variant="inset"</Typography.InlineCode>
                to merge it into the same inset surface as the input.
            </Typography.Text>
            <ComponentPreview code={ToolbarInsetSrc}><ToolbarInset /></ComponentPreview>
        </div>
    </section>
</div>
