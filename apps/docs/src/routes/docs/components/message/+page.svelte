<script lang="ts">
    import * as Avatar from '@mielui/svelte/components/avatar';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import * as Message from '@mielui/svelte/components/message';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import RoleVariants from './examples/role-variants.svelte';
    import RoleVariantsSrc from './examples/role-variants.svelte?raw';
    import States from './examples/states.svelte';
    import StatesSrc from './examples/states.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        messages as playgroundMessages
    } from './playground';

    const usageSnippet = `<script lang="ts">
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import * as Message from '@mielui/svelte/components/message';

    const text = 'I found three sources that agree on the release date.';
<${'/'}script>

<Message.Root from="assistant" name="Assistant" timestamp="12:30">
    <Message.Content>{text}</Message.Content>
    <Message.Actions>
        <CopyButton {text} labels={{ copy: 'Copy message' }} />
    </Message.Actions>
</Message.Root>`;

    const layoutSnippet = `<Message.Root name="Assistant" timestamp="12:30">
    {#snippet layout()}
        <Message.Body>
            <Message.Metadata>
                <Message.Time datetime="2026-09-17T12:30:00+02:00" />
                <Message.Name />
            </Message.Metadata>
            <Message.Content>Ready to review.</Message.Content>
        </Message.Body>
    {/snippet}
</Message.Root>`;

    const labelsSnippet = `<script lang="ts">
    import * as Message from '@mielui/svelte/components/message';
    import type { MessageLabels } from '@mielui/svelte/components/message';

    const labels: MessageLabels = {
        failed: 'Échec',
        streaming: 'En cours',
        complete: 'Terminé',
        actions: 'Actions du message'
    };
<${'/'}script>

<Message.Root from="assistant" status="error" {labels}>
    <Message.Content>La connexion a été interrompue.</Message.Content>
</Message.Root>`;
</script>

<svelte:head>
    <title>Mielui · Message</title>
    <meta
        name="description"
        content="Content-first conversation messages with readable role-aware alignment and contextual actions."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Message">
        Present user, assistant, and system output without adding identity chrome to every turn.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#snippet avatar()}
                    <Avatar.Root size="sm">
                        <Avatar.Fallback>MI</Avatar.Fallback>
                    </Avatar.Root>
                {/snippet}
                <div class="w-full max-w-xl">
                    <Message.Root
                        from={values.from}
                        status={values.status}
                        name={values.name || undefined}
                        timestamp={values.timestamp || undefined}
                        avatar={values.avatar ? avatar : undefined}
                    >
                        <Message.Content>{playgroundMessages[values.from]}</Message.Content>
                        {#if values.actions}
                            <Message.Actions>
                                <CopyButton
                                    text={playgroundMessages[values.from]}
                                    labels={{ copy: 'Copy message' }}
                                />
                            </Message.Actions>
                        {/if}
                    </Message.Root>
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add message" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`from` sets who sent the message, `assistant` by default, and with it the alignment: user messages sit on the right and system messages are centered. `name`, `timestamp`, and an `avatar` snippet add a header and an avatar beside the message."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`status` marks a message as `streaming` or `error`. It does not fetch or stream anything: compose Markdown for formatted text or ResponseStream for arriving plain text, and update `status` when delivery ends or fails. An error shows a Failed status in the header."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Actions is a labelled group of ordinary controls. Tab moves through them in order; there is no toolbar arrow-key navigation. On devices with a fine pointer it fades in on hover or focus. Give every icon-only action an accessible label."}
            />
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Roles, delivery states, and a full assistant turn.
            {/snippet}
        </SectionHeading>

        <div id="assistant-reply" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Assistant reply</Typography.H3>
            <Typography.Text variant="supporting">
                A user prompt followed by an assistant reply with reasoning, Markdown, and actions.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
        </div>

        <div id="roles" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Roles</Typography.H3>
            <ComponentPreview code={RoleVariantsSrc}><RoleVariants /></ComponentPreview>
        </div>

        <div id="states" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Streaming and error</Typography.H3>
            <ComponentPreview code={StatesSrc}><States /></ComponentPreview>
        </div>
    </section>

    <section id="parts" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root renders Avatar, Body, Metadata, Name, Time, and Status for you. Pass a `layout` snippet to omit or reorder them; the parts read the name, timestamp, avatar, and status from Root. Every part accepts `class` and native attributes, such as `datetime` on Time."}
            />
        </Typography.Text>
        <CodeBlock code={layoutSnippet} lang="svelte" copy="overlay" />
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Pass `labels` to Root to translate the Status text and the accessible name of Actions. Every key of `MessageLabels` is optional; omitted keys keep the English text."}
            />
        </Typography.Text>
        <CodeBlock code={labelsSnippet} lang="svelte" copy="overlay" />
    </section>
</div>
