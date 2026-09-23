<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Controlled from './examples/controlled.svelte';
    import ControlledSrc from './examples/controlled.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import MaxTags from './examples/max-tags.svelte';
    import MaxTagsSrc from './examples/max-tags.svelte?raw';
    import Validation from './examples/validation.svelte';
    import ValidationSrc from './examples/validation.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add tag-input';

    const usageSnippet = `import * as TagInput from '$lib/mielui/components/tag-input';

let tags = $state(['svelte']);

<TagInput.Root bind:tags label="Topics">
  <TagInput.List />
  <TagInput.Input placeholder="Add a topic…" />
</TagInput.Root>`;
</script>

<svelte:head>
    <title>Mielui · Tag Input</title>
    <meta
        name="description"
        content="Enter and validate removable tags with keyboard, paste, and form support."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Tag Input">
        A field that turns typed text into removable tags with badge outlines. Type a value, press
        Enter, and keep going.
    </PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}>
            <Hero />
        </ComponentPreview>
    </section>

    <!-- ─── Installation ──────────────────────────────────────────── -->
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Disabled Tag Input fields omit their hidden values from native form submission. Keyboard
            composition does not commit tags. Native input callbacks run before internal handling
            and can cancel it with preventDefault. External description IDs from Root and Input are
            merged without duplicates. Only the rendered description or error is linked; an error
            replaces the built-in description until it clears.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Bind{' '}
            <Typography.InlineCode>tags</Typography.InlineCode> for the tag list. Compose
            <Typography.InlineCode>List</Typography.InlineCode>
            for the tokens and
            <Typography.InlineCode>Input</Typography.InlineCode>
            for entry inside
            <Typography.InlineCode>Root</Typography.InlineCode>
            .
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Read changes through callbacks, guard the list with validation, and cap it with a
                maximum.
            {/snippet}
        </SectionHeading>

        <div id="controlled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Responding to changes</Typography.H3>
            <Typography.Text variant="supporting">
                <Typography.InlineCode>onAdd</Typography.InlineCode>
                and
                <Typography.InlineCode>onRemove</Typography.InlineCode>
                report single-tag edits;
                <Typography.InlineCode>onTagsChange</Typography.InlineCode>
                reports the whole list.
            </Typography.Text>
            <ComponentPreview code={ControlledSrc}>
                <Controlled />
            </ComponentPreview>
        </div>

        <div id="validation" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Validation</Typography.H3>
            <Typography.Text variant="supporting">
                Return{' '}
                <Typography.InlineCode>false</Typography.InlineCode> or an error message from
                <Typography.InlineCode>validate</Typography.InlineCode>
                to reject a tag. Rejections arrive through
                <Typography.InlineCode>onReject</Typography.InlineCode>
                with a human-readable reason.
            </Typography.Text>
            <ComponentPreview code={ValidationSrc}>
                <Validation />
            </ComponentPreview>
        </div>

        <div id="max-tags" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Limiting tags</Typography.H3>
            <Typography.Text variant="supporting">
                <Typography.InlineCode>max</Typography.InlineCode>
                caps the list. Extra tags are rejected with a
                <Typography.InlineCode>max-tags</Typography.InlineCode>
                reason.
            </Typography.Text>
            <ComponentPreview code={MaxTagsSrc}>
                <MaxTags />
            </ComponentPreview>
        </div>
    </section>
</div>
