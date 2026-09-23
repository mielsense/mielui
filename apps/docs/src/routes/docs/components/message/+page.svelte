<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';

    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import RoleVariants from './examples/role-variants.svelte';
    import RoleVariantsSrc from './examples/role-variants.svelte?raw';
    import States from './examples/states.svelte';
    import StatesSrc from './examples/states.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add message';
    const usageSnippet = `import * as Message from '@mielui/svelte/components/message';

<Message.Root from="assistant" status="idle">
  <Message.Content>
    I found three sources that agree on the release date.
  </Message.Content>
  <Message.Actions aria-label="Assistant response actions">
    <!-- Add labeled actions such as copy or rate -->
  </Message.Actions>
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
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>

    <section id="composable-parts" class="flex flex-col gap-4">
        <Typography.H2>Composable parts</Typography.H2>
        <Typography.Text>
            The default layout renders the exported Avatar, Body, Metadata, Name, Time, and Status
            parts. Supply the layout snippet to omit or reorder these regions. Names, timestamps,
            avatars, and status fall back to Root context; native attributes such as Time's datetime
            remain available.
        </Typography.Text>
        <CodeBlock
            code={`<Message.Root name="Assistant" timestamp="12:30">
  {#snippet layout()}
    <Message.Body>
      <Message.Metadata>
        <Message.Time datetime="2026-09-17T12:30:00+02:00" />
        <Message.Name />
      </Message.Metadata>
      <Message.Content>Ready to review.</Message.Content>
    </Message.Body>
  {/snippet}
</Message.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Actions form a labeled group of ordinary controls. Tab moves between actions in document
            order; the group does not impose toolbar arrow-key navigation.
        </Typography.Text>
        <Typography.Text variant="supporting">
            <Typography.InlineCode>Content</Typography.InlineCode>
            adapts its layout to{' '}
            <Typography.InlineCode>from</Typography.InlineCode>
            . Use
            <Typography.InlineCode>status</Typography.InlineCode>
            for streaming or failed output, and give every icon-only action an accessible label.
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
    </section>

    <section id="integration" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Content and delivery</Typography.H2>
        <Typography.Text variant="supporting">
            Message describes a transcript entry. Its status does not fetch or stream content.
            Compose Markdown for formatted content or ResponseStream for arriving plain text, and
            update status when delivery completes or fails. Keep response actions labelled and
            attach retries to application state.
        </Typography.Text>
    </section>
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Use role and status to communicate structure before adding custom presentation.
            {/snippet}
        </SectionHeading>

        <div id="role-variants" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Role variants</Typography.H3>
            <ComponentPreview code={RoleVariantsSrc}><RoleVariants /></ComponentPreview>
        </div>

        <div id="message-states" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">
                Streaming and error states
            </Typography.H3>
            <ComponentPreview code={StatesSrc}><States /></ComponentPreview>
        </div>
    </section>
</div>
