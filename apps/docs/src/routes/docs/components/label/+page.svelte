<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import WithRequired from './examples/with-required.svelte';
    import WithRequiredSrc from './examples/with-required.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add label';
</script>

<svelte:head>
    <title>Mielui · Label</title>
    <meta name="description" content="A styled native label that names a form control." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Label">A styled native label that names a form control.</PageIntro>

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
        <Typography.Text variant="supporting">
            Match for to the input id. Set required on the input when showing a required indicator.
            Apply disabled styling to the label explicitly when it precedes the control.
        </Typography.Text>
        <CodeBlock
            code={`import { Label } from '@mielui/svelte/components/label';\nimport { Input } from '@mielui/svelte/components/input';\n\n<Label for="email">Email</Label>\n<Input id="email" type="email" />`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Common usage patterns for Label with form fields.
            {/snippet}
        </SectionHeading>

        <!-- Required indicator -->
        <div id="required" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With required indicator</Typography.H3>
            <ComponentPreview code={WithRequiredSrc}>
                <WithRequired />
            </ComponentPreview>
        </div>

        <!-- Disabled state -->
        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled field</Typography.H3>
            <ComponentPreview code={DisabledSrc}>
                <Disabled />
            </ComponentPreview>
        </div>
    </section>
    <section id="content" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Content</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The label's text goes in `children`, and it can include other elements such as a required mark or a badge. Clicking any of it focuses the control named by `for`."}
            />
        </Typography.Text>
    </section>
</div>
