<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Compound from './examples/compound.svelte';
    import CompoundSrc from './examples/compound.svelte?raw';
    import CopyInline from './examples/copy-inline.svelte';
    import CopyInlineSrc from './examples/copy-inline.svelte?raw';
    import CopyOverlay from './examples/copy-overlay.svelte';
    import CopyOverlaySrc from './examples/copy-overlay.svelte?raw';
    import CustomActions from './examples/custom-actions.svelte';
    import CustomActionsSrc from './examples/custom-actions.svelte?raw';
    import CustomThemeStylesheet from './examples/custom-theme-stylesheet.svelte';
    import CustomThemeStylesheetSrc from './examples/custom-theme-stylesheet.svelte?raw';
    import CustomThemeVariables from './examples/custom-theme-variables.svelte';
    import CustomThemeVariablesSrc from './examples/custom-theme-variables.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import LineNumbers from './examples/line-numbers.svelte';
    import LineNumbersSrc from './examples/line-numbers.svelte?raw';
    import MultiLanguage from './examples/multi-language.svelte';
    import MultiLanguageSrc from './examples/multi-language.svelte?raw';
    import Single from './examples/single.svelte';
    import SingleSrc from './examples/single.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add code-block';

    const usageSnippet = `import { CodeBlock } from '$lib/mielui/components/code-block';

<CodeBlock
  value="javascript"
  tabs={[
    { label: 'Python',     lang: 'python',     code: pyCode },
    { label: 'JavaScript', lang: 'javascript', code: jsCode },
  ]}
/>`;

    const customThemeSnippet = `import 'highlight.js/styles/github-dark.css';
import { CodeBlock } from '$lib/mielui/components/code-block';

<CodeBlock code={code} lang="typescript" theme="custom" />`;
</script>

<svelte:head>
    <title>Mielui · Code Block</title>
    <meta
        name="description"
        content="Code block with syntax-highlighted snippets, a multi-language tab switcher, copy button, and an actions slot. Highlighting via highlight.js."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Code Block">
        A code viewer with syntax highlighting, a language switcher, and a copy button.
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
        <Typography.Text variant="supporting">
            The component depends on
            <Typography.InlineCode>highlight.js</Typography.InlineCode>
            . Install it if your project doesn't have it yet:
        </Typography.Text>
        <InstallCommand command="pnpm add highlight.js" />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            The theme setting chrome.borders chooses "single" or "double" framing. Double is the
            default. Single removes the extra frame while preserving content padding, composition,
            and inset variants.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Pass a{' '}
            <Typography.InlineCode>tabs</Typography.InlineCode> array for the multi-language form,
            or{' '}
            <Typography.InlineCode>code</Typography.InlineCode>
            +
            <Typography.InlineCode>lang</Typography.InlineCode>
            for a single snippet:
        </Typography.Text>
        <Typography.Text variant="supporting">
            Dynamic tab collections follow the current trigger order, including custom compositions.
            Removing or disabling the active trigger selects the first enabled trigger; copy actions
            and panel direction follow that selection.
        </Typography.Text>
        <Typography.Text variant="supporting">
            A single snippet is a named code region. Multiple snippets use tabs and tab panels.
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            The built-in palette is GitHub light in light mode and GitHub dark in dark mode. For any
            other
            <Typography.InlineCode>highlight.js</Typography.InlineCode>
            theme, set
            <Typography.InlineCode>theme="custom"</Typography.InlineCode>
            and load its stylesheet. The component skips its own token colors:
        </Typography.Text>
        <CodeBlock code={customThemeSnippet} lang="svelte" copy="overlay" />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="single" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Single snippet</Typography.H3>
            <ComponentPreview code={SingleSrc}>
                <Single />
            </ComponentPreview>
        </div>

        <div id="multi-language" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Multiple languages</Typography.H3>
            <ComponentPreview code={MultiLanguageSrc}>
                <MultiLanguage />
            </ComponentPreview>
        </div>

        <div id="line-numbers" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Line numbers</Typography.H3>
            <ComponentPreview code={LineNumbersSrc}>
                <LineNumbers />
            </ComponentPreview>
        </div>

        <div id="custom-actions" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Custom actions</Typography.H3>
            <ComponentPreview code={CustomActionsSrc}>
                <CustomActions />
            </ComponentPreview>
        </div>

        <div id="copy-overlay" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Copy placement: overlay</Typography.H3>
            <ComponentPreview code={CopyOverlaySrc}>
                <CopyOverlay />
            </ComponentPreview>
        </div>

        <div id="copy-inline" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Copy placement: inline</Typography.H3>
            <ComponentPreview code={CopyInlineSrc}>
                <CopyInline />
            </ComponentPreview>
        </div>

        <div id="compound" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Compound API</Typography.H3>
            <ComponentPreview code={CompoundSrc}>
                <Compound />
            </ComponentPreview>
        </div>

        <div id="custom-theme-stylesheet" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Custom theme: stylesheet</Typography.H3>
            <Typography.Text variant="supporting">
                <Typography.InlineCode>theme="custom"</Typography.InlineCode>
                disables the built-in token colors. Load a
                <Typography.InlineCode>highlight.js</Typography.InlineCode>
                stylesheet or supply your own
                <Typography.InlineCode>hljs-*</Typography.InlineCode>
                rules. This example defines One Dark and One Light token colors.
            </Typography.Text>
            <ComponentPreview code={CustomThemeStylesheetSrc}>
                <CustomThemeStylesheet />
            </ComponentPreview>
        </div>

        <div id="custom-theme-variables" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Custom theme: variables</Typography.H3>
            <Typography.Text variant="supporting">
                To keep the built-in palette and only shift its hues, override the
                <Typography.InlineCode>--code-block-token-*</Typography.InlineCode>
                variables on a wrapper. They inherit into the block per mode.
            </Typography.Text>
            <ComponentPreview code={CustomThemeVariablesSrc}>
                <CustomThemeVariables />
            </ComponentPreview>
        </div>
    </section>
    <section id="working-example" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Copy and custom actions</Typography.H2>
        <Typography.Text>
            CodeBlock.Copy copies the active snippet. Keep editor or run actions inside Actions and
            handle their result in your application. This example edits a local query and reports a
            simulated result; it does not connect to a database.
        </Typography.Text>
    </section>
</div>
