<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Basic from './examples/basic.svelte';
    import BasicSrc from './examples/basic.svelte?raw';
    import Context from './examples/context.svelte';
    import ContextSrc from './examples/context.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Modifiers from './examples/modifiers.svelte';
    import ModifiersSrc from './examples/modifiers.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const TITLE = 'Kbd';

    const installCommand = 'pnpm dlx @mielui/svelte add kbd';

    let runs = $state(0);

    function run() {
        runs += 1;
    }
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta name="description" content="Inline keyboard-shortcut badge." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title={TITLE}>
        A key chip for keyboard shortcuts, including inside buttons.
    </PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {@const ontrigger = values.listen ? run : undefined}
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

    <!-- ─── Installation ──────────────────────────────────────────── -->
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Pass a shortcut string such as cmd+K. The visible chip uses Mac menu symbols, while its
            accessible name spells out the keys. Command means Meta and Control means Control on
            every platform.
        </Typography.Text>
        <Typography.Text>
            An active shortcut runs its enclosing enabled button or link, or ontrigger when
            supplied.
        </Typography.Text>
        <Typography.Text>
            A shortcut is any modifiers plus one key: a single character, or enter, esc, tab, space,
            up, down, left, right, backspace, delete, or plus. Other key names are not parsed, so
            the chip renders empty and no shortcut is registered; pass children to label such a key
            yourself.
        </Typography.Text>
        <Typography.Text>
            Executable shortcuts ignore consumed, repeated, and composing key events. Shortcuts in
            hidden or inert controls do not activate, and an active overlay limits activation to its
            own controls.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Import Kbd and pass a keyboard shortcut string:
        </Typography.Text>
        <CodeBlock
            code={`import Kbd from '@mielui/svelte/components/kbd';\n\n<Kbd shortcut="cmd+K" />\n<Kbd shortcut="shift+/" />`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Kbd in various compositions and contexts.
            {/snippet}
        </SectionHeading>

        <div id="shortcuts-in-buttons" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Shortcuts in buttons</Typography.H3>
            <Typography.Text variant="supporting">
                Each chip names the key that runs its button. The lone chip calls ontrigger instead.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <!-- Basic -->
        <div id="basic" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Basic</Typography.H3>
            <ComponentPreview code={BasicSrc}>
                <Basic />
            </ComponentPreview>
        </div>

        <!-- With modifiers -->
        <div id="modifiers" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With modifiers</Typography.H3>
            <ComponentPreview code={ModifiersSrc}>
                <Modifiers />
            </ComponentPreview>
        </div>

        <!-- In context -->
        <div id="context" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">In context</Typography.H3>
            <ComponentPreview code={ContextSrc}>
                <Context />
            </ComponentPreview>
        </div>
    </section>
</div>
