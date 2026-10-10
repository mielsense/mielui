<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';

    import HeadingLevels from './examples/heading-levels.svelte';
    import HeadingLevelsSrc from './examples/heading-levels.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Metadata from './examples/metadata.svelte';
    import MetadataSrc from './examples/metadata.svelte?raw';
    import TextRoles from './examples/text-roles.svelte';
    import TextRolesSrc from './examples/text-roles.svelte?raw';
    import {
        headingLevel,
        code as playgroundCode,
        controls as playgroundControls,
        samples as playgroundSamples
    } from './playground';

    const installCommand = 'pnpm dlx @mielui/svelte add typography';
    const usage = `import * as Typography from '@mielui/svelte/components/typography';

<Typography.H2>Account settings</Typography.H2>
<Typography.Text variant="supporting">Manage your profile and preferences.</Typography.Text>
<Typography.Text variant="body">
  Changes are saved to <Typography.InlineCode>profile.json</Typography.InlineCode>.
</Typography.Text>
<Typography.Metadata>Updated 4 minutes ago</Typography.Metadata>`;

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
                        <Typography.Title level={headingLevel(values.level)}>
                            {playgroundSamples.heading}
                        </Typography.Title>
                    {:else if values.role === 'description'}
                        <Typography.Description>
                            {playgroundSamples.paragraph}
                        </Typography.Description>
                    {:else if values.role === 'text'}
                        <Typography.Text variant={values.variant}>
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
        <InstallCommand command={installCommand} />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting" class="m-0 max-w-2xl">
            Choose a role for meaning, then use
            <Typography.InlineCode>class</Typography.InlineCode>
            for a local exception.
        </Typography.Text>
        <CodeBlock code={usage} lang="svelte" copy="overlay" />
    </section>

    <section id="roles" class="scroll-mt-20 flex flex-col gap-5">
        <SectionHeading title="Role reference">
            {#snippet description()}
                Each component sets typography and color. Set margins and layout on its parent.
            {/snippet}
        </SectionHeading>

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
        <SectionHeading title="Examples">
            {#snippet description()}
                Keep semantic levels explicit and add numeric treatment only where values are
                compared.
            {/snippet}
        </SectionHeading>

        <div id="article-header" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Article header</Typography.H3>
            <Typography.Text variant="supporting" class="m-0 max-w-2xl">
                Metadata, Title and Description stack into the top of an article or a card.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="heading-levels" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Heading levels</Typography.H3>
            <Typography.Text variant="supporting" class="m-0 max-w-2xl">
                Use the heading that matches the document outline.{' '}
                <Typography.InlineCode>Typography.Title</Typography.InlineCode>
                remains available for compact component titles.
            </Typography.Text>
            <ComponentPreview code={HeadingLevelsSrc}>
                <HeadingLevels />
            </ComponentPreview>
        </div>

        <div id="text-roles" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Text roles</Typography.H3>
            <Typography.Text variant="supporting" class="m-0 max-w-2xl">
                Choose a paragraph role from its relationship to the surrounding content, not from a
                standalone size or color.
            </Typography.Text>
            <ComponentPreview code={TextRolesSrc}>
                <TextRoles />
            </ComponentPreview>
        </div>

        <div id="numeric-metadata" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Numeric metadata</Typography.H3>
            <Typography.Text variant="supporting" class="m-0 max-w-2xl">
                Add{' '}
                <Typography.InlineCode>tabular-nums</Typography.InlineCode>
                when readers compare values in a column.
            </Typography.Text>
            <ComponentPreview code={MetadataSrc}>
                <Metadata />
            </ComponentPreview>
        </div>
    </section>
    <section id="parts" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Each role is its own component, and the text goes in `children`. Nothing is passed as a prop, so links, emphasis and inline code can sit inside any of them."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"H1, H2, H3, H4, H5, H6, Title, Description, Text, Metadata and InlineCode render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>
</div>
