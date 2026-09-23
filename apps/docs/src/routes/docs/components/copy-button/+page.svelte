<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Basic from './examples/basic.svelte';
    import BasicSrc from './examples/basic.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Variants from './examples/variants.svelte';
    import VariantsSrc from './examples/variants.svelte?raw';

    const _TITLE = 'Copy Button';

    const installCommand = 'pnpm dlx @mielui/svelte add copy-button';
</script>

<svelte:head>
    <title>Mielui · Copy Button</title>
    <meta
        name="description"
        content="A one-tap clipboard button with a Copy↔Check icon morph and an animated tooltip label."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Copy Button">
        A button that copies text to the clipboard, with copy and copied states.
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
        <Typography.Text variant="supporting">
            Import Copy Button and pass the text to copy:
        </Typography.Text>
        <Typography.Text variant="supporting">
            The click handler runs before copying; call preventDefault() to cancel. The oncopy
            callback receives the exact text requested by the latest successful copy. Pending copies
            are ignored after the button is removed.
        </Typography.Text>
        <CodeBlock
            code={`import { CopyButton } from '$lib/mielui/components/copy-button';\n\n<CopyButton text="pnpm add @mielui/svelte" />\n<CopyButton text={apiKey} label="Copy key" variant="outline" />`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="in-a-field" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">In a field</Typography.H3>
            <ComponentPreview code={BasicSrc}>
                <Basic />
            </ComponentPreview>
        </div>

        <div id="variants" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Variants</Typography.H3>
            <ComponentPreview code={VariantsSrc}>
                <Variants />
            </ComponentPreview>
        </div>
    </section>
    <section id="working-example" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Confirm the clipboard result</Typography.H2>
        <Typography.Text>
            Use oncopy for feedback after a successful clipboard write. A secure browser context and
            clipboard permission are required. Keep the source text available so people can select
            it manually when clipboard access is blocked.
        </Typography.Text>
    </section>
</div>
