<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import EmptyState from './examples/empty-state.svelte';
    import EmptyStateSrc from './examples/empty-state.svelte?raw';
    import FollowOutput from './examples/follow-output.svelte';
    import FollowOutputSrc from './examples/follow-output.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add conversation';
    const usageSnippet = `import * as Conversation from '@mielui/svelte/components/conversation';
import * as Message from '@mielui/svelte/components/message';

let follow = $state(true);

<Conversation.Root bind:follow class="h-[32rem]">
  <Conversation.Content aria-label="Support conversation">
    <Message.Root from="assistant">
      <Message.Content>I found the failed request.</Message.Content>
    </Message.Root>
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
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Give{' '}
            <Typography.InlineCode>Root</Typography.InlineCode> a bounded height so
            <Typography.InlineCode>Content</Typography.InlineCode>
            can scroll. Bind
            <Typography.InlineCode>follow</Typography.InlineCode>
            when the surrounding interface needs to reflect whether new output is being followed.
        </Typography.Text>
        <Typography.Text variant="supporting">
            The scroll button runs your click handler first. Call preventDefault() to keep the
            current scroll position and follow state.
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
    </section>

    <section id="integration" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Scroll ownership</Typography.H2>
        <Typography.Text variant="supporting">
            New messages should not pull readers away from earlier content. Conversation preserves
            their position while follow is false. ScrollButton returns to the latest message and
            resumes following new output.
        </Typography.Text>
    </section>
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Compose the viewport around an empty start or continuously arriving output.
            {/snippet}
        </SectionHeading>

        <div id="empty-state" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Empty state</Typography.H3>
            <ComponentPreview code={EmptyStateSrc}><EmptyState /></ComponentPreview>
        </div>

        <div id="follow-output" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Follow live output</Typography.H3>
            <ComponentPreview code={FollowOutputSrc}><FollowOutput /></ComponentPreview>
        </div>
    </section>
</div>
