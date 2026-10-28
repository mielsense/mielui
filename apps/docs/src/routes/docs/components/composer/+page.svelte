<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Composer from '@mielui/svelte/components/composer';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import AllowEmptyExample from './examples/allow-empty.svelte';
    import AllowEmptyExampleSrc from './examples/allow-empty.svelte?raw';
    import Attachments from './examples/attachments.svelte';
    import AttachmentsSrc from './examples/attachments.svelte?raw';
    import Footer from './examples/footer.svelte';
    import FooterSrc from './examples/footer.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
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
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    let playgroundValue = $state('');

    const usageCode = `<script lang="ts">
    import * as Composer from '@mielui/svelte/components/composer';

    let value = $state('');

    async function send(prompt: string) {
        const response = await fetch('/api/messages', {
            method: 'POST',
            body: prompt
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        value = '';
    }
</${'script'}>

<Composer.Root bind:value onSubmit={send}>
    <Composer.Header>
        <!-- Optional context above the input -->
    </Composer.Header>
    <Composer.Input placeholder="Ask anything..." />
    <Composer.Toolbar>
        <Composer.Actions>
            <!-- Attachment, model or permission controls -->
        </Composer.Actions>
        <Composer.Submit />
    </Composer.Toolbar>
    <Composer.Footer>
        <!-- Optional strip under the writing surface -->
    </Composer.Footer>
</Composer.Root>`;

    const labelsCode = `<script lang="ts">
    import * as Composer from '@mielui/svelte/components/composer';
    import type { ComposerLabels } from '@mielui/svelte/components/composer';

    let value = $state('');

    const labels: ComposerLabels = {
        placeholder: 'Écrivez à l’agent…',
        input: 'Message',
        toolbar: 'Actions du message',
        send: 'Envoyer',
        queue: 'Mettre en file',
        stop: 'Arrêter la réponse',
        sending: 'Envoi',
        error: "Le message n'a pas pu être envoyé."
    };

    function send() {
        value = '';
    }
</${'script'}>

<Composer.Root bind:value {labels} onSubmit={send}>
    <Composer.Input />
    <Composer.Toolbar>
        <Composer.Submit />
    </Composer.Toolbar>
</Composer.Root>`;
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
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <div class="w-full max-w-xl">
                    <Composer.Root
                        bind:value={playgroundValue}
                        onSubmit={() => {
                            playgroundValue = '';
                        }}
                        surface={values.surface === 'theme' ? undefined : values.surface}
                        status={values.status}
                        generating={values.generating || undefined}
                        disabled={values.disabled}
                        allowEmpty={values.allowEmpty}
                    >
                        {#if values.header}
                            <Composer.Header>
                                <Badge variant="outline">release-notes.md</Badge>
                            </Composer.Header>
                        {/if}
                        <Composer.Input />
                        <Composer.Toolbar variant={values.toolbar}>
                            {#if values.actions}
                                <Composer.Actions>
                                    <span class="px-2 text-xs text-foreground-muted">
                                        Mielui 3.1
                                    </span>
                                </Composer.Actions>
                            {/if}
                            <Composer.Submit />
                        </Composer.Toolbar>
                        {#if values.footer}
                            <Composer.Footer>
                                <span class="px-2.5">Answers can cite the web.</span>
                            </Composer.Footer>
                        {/if}
                    </Composer.Root>
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add composer" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            The theme setting chrome.borders chooses "single" or "double" framing. Single is the
            default. Single removes the extra frame while preserving content padding, composition,
            and inset variants.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Bind the prompt value on Root and handle submission with onSubmit. Composer waits for
            async handlers and shows the submitting state until they finish. Submit names its icon
            Send, Queue message, or Stop response to match the current action.
        </Typography.Text>
        <Typography.Text variant="supporting">
            If submission rejects, Composer preserves the prompt and shows labels.error. Use onError
            to report the failure, then retry with the same submit button. If you set status="error"
            yourself, your application must clear it.
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            By default,{' '}
            <Kbd shortcut="enter" />
            submits and
            <Kbd shortcut="shift+enter" />
            inserts a new line. Set
            <Typography.InlineCode>submitOnEnter={false}</Typography.InlineCode>
            on
            <Typography.InlineCode>Input</Typography.InlineCode>
            when Enter should always create a new line.
        </Typography.Text>
    </section>

    <section id="glass" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Composer follows the theme's surface setting. Glass frosts the frame and keeps the
            writing surface on a more opaque fill. Set surface="glass" or surface="solid" on Root to
            force one regardless of the theme.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}>
            <Glass />
        </ComponentPreview>
    </section>

    <section id="integration" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Submission and cancellation</Typography.H2>
        <Typography.Text variant="supporting">
            Return a promise from onSubmit to keep the submit control pending until your request
            settles. Reject it to preserve the prompt and display labels.error. Use controlled
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

        <div id="agent-prompt" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Agent prompt</Typography.H3>
            <Typography.Text variant="supporting">
                A composer with attachments, permission and model pickers, dictation, and a footer
                action.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
        </div>

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

        <div id="attachments" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Attachments</Typography.H3>
            <Typography.Text variant="supporting">
                Wrap Composer.Root in Attachment.Root so files can be dropped anywhere on the
                composer. Place
                <Typography.InlineCode>Attachment.List variant="chip"</Typography.InlineCode>
                above Composer.Root, inside Attachment.Root, to show a scrolling row of chips
                outside the frame. The list disappears when there are no files.
            </Typography.Text>
            <ComponentPreview code={AttachmentsSrc}><Attachments /></ComponentPreview>
        </div>

        <div id="toolbar-inset" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Toolbar placement</Typography.H3>
            <Typography.Text variant="supporting">
                The composer is a recessed frame holding a raised writing surface. The toolbar joins
                the input on that surface by default. Set{' '}
                <Typography.InlineCode>variant="inset"</Typography.InlineCode>
                {' '}
                to keep the input on its own surface with the toolbar on the frame under it. Toolbar
                controls are ghost buttons and triggers. Outline ones render as flat pills at the
                same height. Send is the one filled primary pill, and it turns neutral while it
                stops a response.
            </Typography.Text>
            <ComponentPreview code={ToolbarInsetSrc}><ToolbarInset /></ComponentPreview>
        </div>

        <div id="footer" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Footer</Typography.H3>
            <Typography.Text variant="supporting">
                Composer.Footer is a strip on the frame under the writing surface, for a hint,
                connected apps, or a setting that applies to the whole message. The input and
                toolbar stay joined above it. Its text is muted and its controls use the small
                control height. It takes no space while it is empty.
            </Typography.Text>
            <ComponentPreview code={FooterSrc}><Footer /></ComponentPreview>
        </div>
    </section>
    <section id="empty-and-disabled" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading"
            >Empty messages and the disabled state</Typography.H2
        >
        <Typography.Text variant="supporting">
            <InlineText
                text={"Submit is disabled while the input is empty. Set `allowEmpty` on Root when a message can be only attachments, so it can be sent with no text. `disabled` on Root turns off the input and the button together."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Submit changes job as the conversation moves. While a response is generating and the input is empty it stops the response, and with text typed it queues the next message. `labels.stop` and `labels.queue` on Root are its accessible names in those two states, and `labels.sending` names it while `onSubmit` is pending. Its `onclick` runs first, and calling `preventDefault()` there cancels the stop."}
            />
        </Typography.Text>
        <ComponentPreview code={AllowEmptyExampleSrc}>
            <AllowEmptyExample />
        </ComponentPreview>
    </section>
    <section id="parts" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Input and Submit accept `element` to bind the textarea and the button."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Header, Toolbar, Actions, Submit and Footer render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Built-in text is English by default. Pass a `labels` object of type `ComposerLabels` to `Composer.Root` to translate the input placeholder and accessible name, the toolbar name, the four names of Submit, and the message shown when submitting fails. Every key is optional; omitted keys keep their default. A `placeholder` or `aria-label` set directly on Input or Toolbar wins over `labels`."}
            />
        </Typography.Text>
        <CodeBlock code={labelsCode} lang="svelte" copy="overlay" />
    </section>
</div>
