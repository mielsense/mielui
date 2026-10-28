<script lang="ts">
    import { LinkSquare02Icon } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
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
    import {
        code as playgroundCode,
        command as playgroundCommand,
        controls as playgroundControls,
        tabs as playgroundTabs,
        typescript as playgroundTypescript
    } from './playground';

    const playgroundSnippets = {
        tabs: undefined,
        snippet: playgroundTypescript,
        command: playgroundCommand
    };

    const usage = `<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';

    const python = 'print("Hello")';
    const javascript = "console.log('Hello');";
</${'script'}>

<CodeBlock
    tabs={[
        { label: 'Python', lang: 'python', code: python },
        { label: 'JavaScript', lang: 'javascript', code: javascript }
    ]}
/>`;

    const customThemeUsage = `<script lang="ts">
    import 'highlight.js/styles/github-dark.css';
    import { CodeBlock } from '@mielui/svelte/components/code-block';

    const code = 'const answer = 42;';
</${'script'}>

<CodeBlock {code} lang="typescript" theme="custom" />`;
</script>

<svelte:head>
    <title>Mielui · Code Block</title>
    <meta
        name="description"
        content="Code block with syntax-highlighted snippets, a multi-language tab switcher, copy button, and an actions slot. Highlighting via highlight.js."
    />
</svelte:head>

{#snippet playgroundActions()}
    <Button variant="ghost" size="icon" aria-label="Open in editor">
        <HugeiconsIcon icon={LinkSquare02Icon} size={15} />
    </Button>
{/snippet}

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Code Block">
        A code viewer with syntax highlighting, a language switcher, and a copy button.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#key values.content}
                    <CodeBlock
                        tabs={values.content === 'tabs' ? playgroundTabs : undefined}
                        code={playgroundSnippets[values.content]}
                        lang={values.content === 'command' ? 'bash' : 'typescript'}
                        copy={values.copy}
                        showLineNumbers={values.showLineNumbers}
                        actions={values.actions ? playgroundActions : undefined}
                        class="max-w-xl"
                    />
                {/key}
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add code-block" />
        <Typography.Text variant="supporting">
            The component depends on{' '}
            <Typography.InlineCode>highlight.js</Typography.InlineCode>
            for syntax highlighting. Install it if your project doesn't have it yet:
        </Typography.Text>
        <InstallCommand command="pnpm add highlight.js" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Pass `code` and `lang` for a single snippet, or a `tabs` array for several languages. Bind `value` to read or set the active tab; it defaults to the first one."}
            />
        </Typography.Text>
        <CodeBlock code={usage} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            A single snippet is a named code region. Several snippets use tabs and tab panels. When
            the active tab is removed or disabled, the first enabled tab takes over, and the copy
            button follows it.
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The built-in palette is GitHub light in light mode and GitHub dark in dark mode. For any other `highlight.js` theme, set `theme=\"custom\"` and load its stylesheet; the component then skips its own token colors."}
            />
        </Typography.Text>
        <CodeBlock code={customThemeUsage} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            <InlineText
                text={"The theme's `chrome.borders` setting chooses `single` or `double` framing. `single` is the default."}
            />
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="composed-header" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Composed header</Typography.H3>
            <Typography.Text variant="supporting">
                Five languages share one block, with two extra actions beside the copy button.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
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
            <Typography.Text variant="supporting">
                Put editor or run buttons in Actions and handle their result in your application.
                This example edits a local query and reports a simulated result; it sends no
                request.
            </Typography.Text>
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
    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Built-in text is English by default. Pass `labels` to CodeBlock or Root to translate or reword the code region's name and the copy button. Every key of `CodeBlockLabels` is optional; omitted keys keep their default."}
            />
        </Typography.Text>
        <CodeBlock
            code={`<CodeBlock
    {code}
    lang="ts"
    labels={{
        code: 'Code',
        copy: 'Copier le code',
        copied: 'Copié'
    }}
/>`}
            lang="svelte"
            copy="overlay"
        />
    </section>
    <section id="copy-and-parts" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Copy button and parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Copy copies the active snippet and shows a short confirmation. Its tooltip and accessible name come from `labels.copy` and `labels.copied` on Root, Copy code and Copied by default. Trigger is the tab for one language in a multi-language block, and `disabled` greys out a tab whose snippet is not ready."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Every part takes `class`, and the parts that wrap content render their `children`."}
            />
        </Typography.Text>
    </section>
</div>
