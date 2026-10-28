<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import SectionHeading from '#lib/components/docs/section-heading.svelte';
    import Basic from './examples/basic.svelte';
    import BasicSrc from './examples/basic.svelte?raw';
    import Context from './examples/context.svelte';
    import ContextSrc from './examples/context.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Modifiers from './examples/modifiers.svelte';
    import ModifiersSrc from './examples/modifiers.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    let runs = $state(0);

    function run() {
        runs += 1;
    }

    const usageSnippet = `<script lang="ts">
    import Kbd from '@mielui/svelte/components/kbd';
<${'/'}script>

<Kbd shortcut="cmd+K" />`;

    const labelsSnippet = `<script lang="ts">
    import Kbd, { type KbdLabels } from '@mielui/svelte/components/kbd';

    const labels: KbdLabels = {
        command: 'Commande',
        shift: 'Majuscule',
        enter: 'Entrée'
    };
<${'/'}script>

<Kbd shortcut="cmd+shift+enter" {labels} />`;
</script>

<svelte:head>
    <title>Mielui · Kbd</title>
    <meta name="description" content="Inline keyboard-shortcut badge." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Kbd">A key chip for keyboard shortcuts, including inside buttons.</PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {const ontrigger = $derived(values.listen ? run : undefined)}
                {#snippet kbd()}
                    {#if values.label}
                        <Kbd shortcut={values.shortcut} {ontrigger}>{values.label}</Kbd>
                    {:else}
                        <Kbd shortcut={values.shortcut} {ontrigger} />
                    {/if}
                {/snippet}
                {#if values.button || values.listen}
                    <div class="flex flex-col items-center gap-3">
                        {#if values.button}
                            <Button variant="secondary" onclick={run}>
                                Search
                                {@render kbd()}
                            </Button>
                        {:else}
                            {@render kbd()}
                        {/if}
                        <p role="status" class="m-0 text-sm text-foreground-muted">Runs: {runs}</p>
                    </div>
                {:else}
                    {@render kbd()}
                {/if}
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add kbd" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Pass a `shortcut` such as `cmd+K`. The chip shows Mac menu symbols and its accessible name spells the keys out. `cmd` always means Meta and `ctrl` always means Control, on every platform. The chip is hidden below the `sm` breakpoint, where there is usually no keyboard."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"A shortcut is any modifiers plus one key: a single character, or `enter`, `esc`, `tab`, `space`, `up`, `down`, `left`, `right`, `backspace`, `delete`, or `plus`. Other key names are not parsed, so the chip renders empty and nothing is registered; pass children to label such a key yourself."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Inside an enabled button or link, pressing the shortcut activates that control. Elsewhere, pass `ontrigger` to run your own handler. Shortcuts ignore keys typed into a text field (except `enter` and `esc` from an input), repeated and composing key events, and events another handler already consumed. Hidden or inert controls do not activate, and an open overlay limits shortcuts to its own controls."}
            />
        </Typography.Text>
        <CodeBlock code={usageSnippet} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Single keys, modifier combinations, and shortcuts that run a button.
            {/snippet}
        </SectionHeading>

        <div id="shortcuts-in-buttons" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Shortcuts in buttons</Typography.H3>
            <Typography.Text variant="supporting">
                Each chip names the key that runs its button. The lone chip calls its own handler.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="basic" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Basic</Typography.H3>
            <ComponentPreview code={BasicSrc}>
                <Basic />
            </ComponentPreview>
        </div>

        <div id="modifiers" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Modifiers</Typography.H3>
            <ComponentPreview code={ModifiersSrc}>
                <Modifiers />
            </ComponentPreview>
        </div>

        <div id="in-a-button" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">In a button</Typography.H3>
            <ComponentPreview code={ContextSrc}>
                <Context />
            </ComponentPreview>
        </div>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Pass `labels` to translate the key names in the chip's accessible name, such as `command`, `shift`, `enter`, or `up`. The symbols on the chip stay the same, and single characters are read as written. Every key of `KbdLabels` is optional; omitted keys keep the English name."}
            />
        </Typography.Text>
        <CodeBlock code={labelsSnippet} lang="svelte" copy="overlay" />
    </section>
</div>
