<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Inbox from './examples/inbox.svelte';
    import InboxSrc from './examples/inbox.svelte?raw';
    import Search from './examples/search.svelte';
    import SearchSrc from './examples/search.svelte?raw';
</script>

<svelte:head>
    <title>Mielui · Empty State</title>
    <meta
        name="description"
        content="Explain why content is missing and give people a useful next step."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>Empty State</Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                Explain why content is missing and give people a useful next step.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add empty-state" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Root controls spacing and alignment. Header groups Title and Description. Put an icon or
            image in Media, supporting content in Content, and existing Buttons or links in Actions.
            Every part is optional and stays where you place it. There is no default border or
            background, so the empty state can sit inside a table, panel, or page without adding
            another card.
        </Typography.Text>
        <CodeBlock
            code={`import { Button } from '$lib/mielui/components/button';
import * as EmptyState from '$lib/mielui/components/empty-state';

<EmptyState.Root>
    <EmptyState.Header>
        <EmptyState.Title>No saved reports</EmptyState.Title>
        <EmptyState.Description>
            Save a report to return to it later.
        </EmptyState.Description>
    </EmptyState.Header>
    <EmptyState.Actions>
        <Button href="/reports/new">Create report</Button>
    </EmptyState.Actions>
</EmptyState.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        <div id="search-results" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">No search results</Typography.H3>
            <Typography.Text variant="supporting">
                An icon, a heading, and a short explanation. Keep search and filter controls in the
                surrounding application.
            </Typography.Text>
            <ComponentPreview code={SearchSrc}><Search /></ComponentPreview>
        </div>
        <div id="inbox" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Completed work</Typography.H3>
            <Typography.Text variant="supporting">
                A confirmation icon marks a completed task. This composition omits Actions and
                Content.
            </Typography.Text>
            <ComponentPreview code={InboxSrc}><Inbox /></ComponentPreview>
        </div>
    </section>

    <section id="accessibility" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Accessibility</Typography.H2>
        <Typography.Text variant="supporting">
            Title renders an h2 by default. Use level to match the surrounding heading outline. Mark
            decorative icons with aria-hidden on Media. Give meaningful images their own alt text.
            Parts forward native attributes and event handlers to their elements.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Root does not announce itself or move focus. For changing search results, keep a
            separate role="status" element mounted and update its text. Keep interactive actions
            outside that live region. If an action removes the focused control, move focus to the
            next useful control. Loading and failed requests need their own messages; an empty
            result should mean the request finished successfully.
        </Typography.Text>
    </section>
</div>
