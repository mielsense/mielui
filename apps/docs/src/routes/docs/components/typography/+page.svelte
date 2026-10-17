<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import HeadingLevels from './examples/heading-levels.svelte';
    import HeadingLevelsSrc from './examples/heading-levels.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Metadata from './examples/metadata.svelte';
    import MetadataSrc from './examples/metadata.svelte?raw';
    import TextRoles from './examples/text-roles.svelte';
    import TextRolesSrc from './examples/text-roles.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        samples as playgroundSamples,
        textVariant as playgroundTextVariant
    } from './playground';

    const roles = [
        {
            name: 'H1-H6',
            element: 'h1-h6',
            tokens: '--font-header / document heading scale / --font-weight-header'
        },
        {
            name: 'Text · lead',
            element: 'p',
            tokens: '--font-size-header / --font-weight-description / foreground-muted'
        },
        {
            name: 'Text · body',
            element: 'p',
            tokens: '--font-size-body / --font-weight-body / foreground'
        },
        {
            name: 'Text · supporting',
            element: 'p',
            tokens: '--font-size-body / --font-weight-body / foreground-muted'
        },
        {
            name: 'InlineCode',
            element: 'code',
            tokens: '--font-mono / --radius-sm / secondary'
        },
        {
            name: 'Title',
            element: 'h1-h6',
            tokens: '--font-header / --font-size-header / --font-weight-header'
        },
        {
            name: 'Description',
            element: 'p',
            tokens: '--font-size-body / --font-weight-description / --tracking-body'
        },
        {
            name: 'Metadata',
            element: 'span',
            tokens: '--text-xs / --font-weight-body / --tracking-body'
        }
    ];

    const usageCode = `<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
</${'script'}>

<Typography.H2>Account settings</Typography.H2>
<Typography.Text>Manage your profile and preferences.</Typography.Text>
<Typography.Text variant="body">
    Changes are saved to <Typography.InlineCode>profile.json</Typography.InlineCode>.
</Typography.Text>
<Typography.Metadata>Updated 4 minutes ago</Typography.Metadata>`;
</script>

<svelte:head>
    <title>Mielui · Typography</title>
    <meta
        name="description"
        content="Semantic document headings, text, inline code, and interface typography primitives."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Typography">
        Semantic text roles that keep visual hierarchy separate from document structure.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <div class="max-w-xl">
                    {#if values.role === 'h1'}
                        <Typography.H1>{playgroundSamples.heading}</Typography.H1>
                    {:else if values.role === 'h2'}
                        <Typography.H2>{playgroundSamples.heading}</Typography.H2>
                    {:else if values.role === 'h3'}
                        <Typography.H3>{playgroundSamples.heading}</Typography.H3>
                    {:else if values.role === 'h4'}
                        <Typography.H4>{playgroundSamples.heading}</Typography.H4>
                    {:else if values.role === 'h5'}
                        <Typography.H5>{playgroundSamples.heading}</Typography.H5>
                    {:else if values.role === 'h6'}
                        <Typography.H6>{playgroundSamples.heading}</Typography.H6>
                    {:else if values.role === 'title'}
                        <Typography.Title level={2}>{playgroundSamples.heading}</Typography.Title>
                    {:else if values.role === 'description'}
                        <Typography.Description>
                            {playgroundSamples.paragraph}
                        </Typography.Description>
                    {:else if values.role.startsWith('text-')}
                        <Typography.Text variant={playgroundTextVariant(values.role)}>
                            {playgroundSamples.paragraph}
                        </Typography.Text>
                    {:else if values.role === 'metadata'}
                        <Typography.Metadata>{playgroundSamples.metadata}</Typography.Metadata>
                    {:else}
                        <Typography.InlineCode>{playgroundSamples.code}</Typography.InlineCode>
                    {/if}
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add typography" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={'Pick each component for what the text is, not how it looks, and use `class` for a local exception. The text goes in `children`, so links, emphasis, and inline code can sit inside any of them. Text defaults to the `supporting` variant.'}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
    </section>

    <section id="roles" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Roles</Typography.H2>
        <Typography.Text variant="supporting">
            Each component sets typography and color only. Set margins and layout on its parent.
        </Typography.Text>
        <div class="divide-y divide-border border-y border-border">
            {#each roles as role (role.name)}
                <div
                    class="grid gap-2 py-4 sm:grid-cols-[7rem_5rem_1fr] sm:items-baseline sm:gap-6"
                >
                    <span class="text-sm font-[var(--font-weight-label,500)] text-foreground">
                        {role.name}
                    </span>
                    <code class="font-mono text-xs text-foreground-muted">{role.element}</code>
                    <code
                        class="break-words font-mono text-xs leading-relaxed text-foreground-muted"
                    >
                        {role.tokens}
                    </code>
                </div>
            {/each}
        </div>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="article-header" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Article header</Typography.H3>
            <Typography.Text variant="supporting">
                Metadata, Title, and Description stack into the top of an article.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="heading-levels" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Heading levels</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'Use the heading that matches the document outline. `Title` has one size for compact component titles and takes the heading `level` it renders.'}
                />
            </Typography.Text>
            <ComponentPreview code={HeadingLevelsSrc}>
                <HeadingLevels />
            </ComponentPreview>
        </div>

        <div id="text-roles" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Text roles</Typography.H3>
            <Typography.Text variant="supporting">
                Choose a paragraph role from how it relates to the content around it.
            </Typography.Text>
            <ComponentPreview code={TextRolesSrc}>
                <TextRoles />
            </ComponentPreview>
        </div>

        <div id="numeric-metadata" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Numeric metadata</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText text={'Add `tabular-nums` when readers compare values in a column.'} />
            </Typography.Text>
            <ComponentPreview code={MetadataSrc}>
                <Metadata />
            </ComponentPreview>
        </div>
    </section>
</div>
