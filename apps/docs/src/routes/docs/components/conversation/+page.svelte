<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Conversation from '@mielui/svelte/components/conversation';
    import * as Message from '@mielui/svelte/components/message';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import SectionHeading from '#lib/components/docs/section-heading.svelte';
    import EmptyState from './examples/empty-state.svelte';
    import EmptyStateSrc from './examples/empty-state.svelte?raw';
    import FollowOutput from './examples/follow-output.svelte';
    import FollowOutputSrc from './examples/follow-output.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        transcript as playgroundTranscript
    } from './playground';

    const usageCode = `<script lang="ts">
    import * as Conversation from '@mielui/svelte/components/conversation';
    import * as Message from '@mielui/svelte/components/message';

    let follow = $state(true);
</${'script'}>

<Conversation.Root bind:follow class="h-[32rem]">
    <Conversation.Content aria-label="Support conversation">
        <Message.Root from="assistant">
            <Message.Content>I found the failed request.</Message.Content>
        </Message.Root>
    </Conversation.Content>
    <Conversation.ScrollButton />
</Conversation.Root>`;

    const labelsCode = `<script lang="ts">
    import * as Conversation from '@mielui/svelte/components/conversation';
    import type { ConversationLabels } from '@mielui/svelte/components/conversation';

    const labels: ConversationLabels = {
        transcript: 'Conversation',
        scrollToBottom: 'Aller au dernier message',
        emptyTitle: 'Démarrer une conversation',
        emptyDescription: 'Posez une question ou décrivez votre travail.'
    };
</${'script'}>

<Conversation.Root {labels} class="h-[32rem]">
    <Conversation.Content>
        <Conversation.Empty />
    </Conversation.Content>
    <Conversation.ScrollButton />
</Conversation.Root>`;
</script>

<svelte:head>
    <title>Mielui · Conversation</title>
    <meta
        name="description"
        content="An auto-following, accessible conversation viewport with empty and jump-to-latest states."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Conversation">
        Display a live transcript. Follow new messages until the user scrolls away.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <Conversation.Root class="mielui-plate h-72 w-full max-w-xl">
                    <Conversation.Content aria-label="Checkout incident conversation">
                        {#if values.view === 'empty'}
                            <Conversation.Empty />
                        {:else}
                            {#each playgroundTranscript as message (message.text)}
                                <Message.Root from={message.from}>
                                    <Message.Content>{message.text}</Message.Content>
                                </Message.Root>
                            {/each}
                        {/if}
                    </Conversation.Content>
                    {#if values.scrollButton}
                        <Conversation.ScrollButton />
                    {/if}
                </Conversation.Root>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add conversation" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Give{' '}
            <Typography.InlineCode>Root</Typography.InlineCode>
            a bounded height so
            <Typography.InlineCode>Content</Typography.InlineCode>
            can scroll. Bind
            <Typography.InlineCode>follow</Typography.InlineCode>
            when the surrounding interface needs to reflect whether new output is being followed.
        </Typography.Text>
        <Typography.Text variant="supporting">
            The scroll button runs your click handler first. Call preventDefault() to keep the
            current scroll position and follow state.
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
    </section>

    <section id="scroll-ownership" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Scroll ownership</Typography.H2>
        <Typography.Text variant="supporting">
            Conversation follows new output while the reader is at the bottom. Scrolling up sets
            follow to false and keeps their position as messages arrive. threshold is the distance
            from the bottom, 80 pixels by default, that still counts as following. ScrollButton
            returns to the latest message and resumes following.
        </Typography.Text>
    </section>
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Compose the viewport around an empty start or continuously arriving output.
            {/snippet}
        </SectionHeading>

        <div id="incident-review" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Incident review</Typography.H3>
            <Typography.Text variant="supporting">
                A longer transcript with reasoning, markdown, and a code block inside the messages.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="empty-state" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Empty state</Typography.H3>
            <Typography.Text variant="supporting">
                Empty shows a chat icon, a title and a description by default. Pass icon, title,
                description and action to replace them. To only translate the default title and
                description, use labels on Root.
            </Typography.Text>
            <ComponentPreview code={EmptyStateSrc}>
                <EmptyState />
            </ComponentPreview>
        </div>

        <div id="follow-output" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Follow live output</Typography.H3>
            <ComponentPreview code={FollowOutputSrc}>
                <FollowOutput />
            </ComponentPreview>
        </div>
    </section>
    <section id="layout" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Layout and parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Content is the scroll viewport, and the messages sit in a stack inside it. `class` styles the viewport, while `transcriptClass` styles that inner stack, which is where the gap between messages, the side padding and a maximum width belong."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"ScrollButton reads its accessible name from `labels.scrollToBottom` on Root, which defaults to Scroll to latest message. Root, Content and Empty render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Built-in text is English by default. Pass a `labels` object of type `ConversationLabels` to `Conversation.Root` to translate the transcript's accessible name, the scroll button's name, and the default title and description of Empty. Every key is optional; omitted keys keep their default. An `aria-label` on Content and a `title` or `description` on Empty win over `labels`. Empty also reads `labels` when it renders outside Root, and falls back to English there."}
            />
        </Typography.Text>
        <CodeBlock code={labelsCode} lang="svelte" copy="overlay" />
    </section>
</div>
