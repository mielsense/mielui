<script lang="ts">
    import { GitBranchIcon as GitBranch } from '@hugeicons/core-free-icons';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Input } from '@mielui/svelte/components/input';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import SectionHeading from '#lib/components/docs/section-heading.svelte';
    import Adornments from './examples/adornments.svelte';
    import AdornmentsSrc from './examples/adornments.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Validation from './examples/validation.svelte';
    import ValidationSrc from './examples/validation.svelte?raw';
    import Variants from './examples/variants.svelte';
    import VariantsSrc from './examples/variants.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usageSnippet = `<script lang="ts">
    import { Input } from '@mielui/svelte/components/input';

    let email = $state('');
<${'/'}script>

<Input bind:value={email} label="Email" type="email" placeholder="you@example.com" />`;
</script>

<svelte:head>
    <title>Mielui · Input</title>
    <meta
        name="description"
        content="Text input with labels, helper text, leading and trailing adornments, visual variants, and native validation."
    />
</svelte:head>

{#snippet playgroundLeading()}
    <HugeiconsIcon icon={GitBranch} />
{/snippet}

{#snippet playgroundTrailing()}
    <span>.git</span>
{/snippet}

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Input">
        A text field with optional labels, helper text, and decorative adornments. Comes in two
        variants.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <div class="w-full max-w-xs">
                    <Input
                        variant={values.variant}
                        label={values.label ? 'Project name' : undefined}
                        aria-label={values.label ? undefined : 'Project name'}
                        description={values.description
                            ? 'The name shown in your workspace.'
                            : undefined}
                        placeholder={values.placeholder || undefined}
                        disabled={values.disabled}
                        required={values.required}
                        aria-invalid={values.invalid ? 'true' : undefined}
                        leading={values.leading ? playgroundLeading : undefined}
                        trailing={values.trailing ? playgroundTrailing : undefined}
                    />
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add input" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `value` to the field value. `label` is the visible name and `description` the helper text under the field; both are linked to the input. Native attributes such as `type`, `name`, `required`, and `autocomplete` pass through to the input, and `bind:element` gives you the input element."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"For a file input, bind `files` rather than `value`. Native checkbox and radio inputs bind `checked`; radios with the same `name` in the same form stay in sync. Use Checkbox and RadioGroup for styled selection controls."}
            />
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Add context with adornments, choose a visual variant, and use native validation.
            {/snippet}
        </SectionHeading>

        <div id="in-a-form" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">In a form</Typography.H3>
            <Typography.Text variant="supporting">
                Two fields with descriptions, saved together by one button.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="adornments" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Adornments</Typography.H3>
            <Typography.Text variant="supporting">
                Use non-interactive leading and trailing snippets with text-entry inputs for icons,
                units, or short context.
            </Typography.Text>
            <ComponentPreview code={AdornmentsSrc}>
                <Adornments />
            </ComponentPreview>
        </div>

        <div id="variants" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Variants</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`outline`, the default, draws a hairline on the field color. `secondary` uses a filled background."}
                />
            </Typography.Text>
            <ComponentPreview code={VariantsSrc}>
                <Variants />
            </ComponentPreview>
        </div>

        <div id="validation" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Validation</Typography.H3>
            <Typography.Text variant="supporting">
                Use native constraints with error messages that respond to blur and form submission.
            </Typography.Text>
            <ComponentPreview code={ValidationSrc}>
                <Validation />
            </ComponentPreview>
        </div>
    </section>
</div>
