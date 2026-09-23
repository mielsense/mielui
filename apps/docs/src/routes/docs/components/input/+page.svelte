<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';

    import Adornments from './examples/adornments.svelte';
    import AdornmentsSrc from './examples/adornments.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Validation from './examples/validation.svelte';
    import ValidationSrc from './examples/validation.svelte?raw';
    import VariantOutline from './examples/variant-outline.svelte';
    import VariantOutlineSrc from './examples/variant-outline.svelte?raw';
    import VariantSecondary from './examples/variant-secondary.svelte';
    import VariantSecondarySrc from './examples/variant-secondary.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add input';
</script>

<svelte:head>
    <title>Mielui · Input</title>
    <meta
        name="description"
        content="Text input with labels, helper text, leading and trailing adornments, visual variants, and native validation."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Input">
        A text field with optional labels, helper text, and decorative adornments. Comes in two
        variants.
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
            Bind value to the field value. Use label for its visible name, description for helper
            text, and native attributes such as type, name, required, and autocomplete for form
            behavior.
        </Typography.Text>
        <Typography.Text>
            Input preserves native checkbox and radio submission values and checked state. Bind
            files for file inputs; do not bind a file input's value. Text and numeric input values
            are strings or numbers. Use Checkbox and RadioGroup for styled selection controls and
            shared radio selection state.
        </Typography.Text>
        <Typography.Text variant="supporting">
            For native radios, bind checked separately on each input. Radios with the same name and
            form owner synchronize their bound values when selection changes; form resets
            synchronize them to the browser's default state. Radios in other forms remain
            independent. Use RadioGroup when you want one shared selection value.
        </Typography.Text>
        <Typography.Text>
            Labels point to the native control, and descriptions are linked with aria-describedby.
            External aria-describedby IDs are preserved and deduplicated alongside the built-in
            description. Conditional descriptions are linked only while rendered, with stable
            metadata IDs across changes to the control id.
        </Typography.Text>

        <CodeBlock
            code={`import { Input } from '$lib/mielui/components/input';\n\n<Input label="Email" placeholder="you@example.com" />`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Add context with adornments, choose a visual variant, and use native validation.
            {/snippet}
        </SectionHeading>

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

        <!-- Variants -->
        <div id="variant-outline" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Outline</Typography.H3>
            <ComponentPreview code={VariantOutlineSrc}>
                <VariantOutline />
            </ComponentPreview>
        </div>

        <div id="variant-secondary" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Secondary</Typography.H3>
            <ComponentPreview code={VariantSecondarySrc}>
                <VariantSecondary />
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
