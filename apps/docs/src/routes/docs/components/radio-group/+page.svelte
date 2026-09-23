<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Descriptions from './examples/descriptions.svelte';
    import DescriptionsSrc from './examples/descriptions.svelte?raw';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add radio-group';
</script>

<svelte:head>
    <title>Mielui · Radio Group</title>
    <meta name="description" content="A group of mutually-exclusive options." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Radio Group">A group of radio buttons for selecting one option.</PageIntro>

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
            Each group owns its keyboard selection and generated item IDs. Set name when the
            selected value should be submitted with a form. Descriptions are linked to their inputs,
            and keyboard focus appears on the visible radio.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Import RadioGroup and compose it with Item sub-components:
        </Typography.Text>
        <CodeBlock
            code={`import * as RadioGroup from '$lib/mielui/components/radio-group';\n\n<RadioGroup.Root bind:value name="plan">\n  <RadioGroup.Item value="pro" label="Pro" />\n</RadioGroup.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <!-- With descriptions -->
        <div id="descriptions" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With descriptions</Typography.H3>
            <ComponentPreview code={DescriptionsSrc}>
                <Descriptions />
            </ComponentPreview>
        </div>

        <!-- Disabled -->
        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled</Typography.H3>
            <ComponentPreview code={DisabledSrc}>
                <Disabled />
            </ComponentPreview>
        </div>
    </section>
</div>
