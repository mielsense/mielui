<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Basic from './examples/basic.svelte';
    import BasicSrc from './examples/basic.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import InputSearch from './examples/input-search.svelte';
    import InputSearchSrc from './examples/input-search.svelte?raw';
    import MenuSearch from './examples/menu-search.svelte';
    import MenuSearchSrc from './examples/menu-search.svelte?raw';
    import Scrollable from './examples/scrollable.svelte';
    import ScrollableSrc from './examples/scrollable.svelte?raw';

    const TITLE = 'Combobox';
    const SLUG = 'combobox';

    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta name="description" content="Searchable select dropdown with fuzzy matching." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>
                {TITLE}
            </Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                A searchable dropdown that filters options as you type.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>

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
            Pointer selection and Enter in either search placement update bind:value and call
            onValueChange. Disabled options are skipped by keyboard navigation. Item label changes
            refresh the selected label without replacing the text currently being searched. Bits UI
            manages the combobox interactions; Mielui owns filtering, styling and motion.
        </Typography.Text>
        <Typography.Text>
            Set name on Trigger to submit the selected value with a form. Search text and labels are
            not submitted. Trigger renders an input by default and a button when
            searchPlacement="menu"; bind:element follows that element type. Item callback runs when
            that option changes the selection. Re-selecting the current option closes the menu
            without reporting another value change. Trigger onclick receives the mouse event;
            preventDefault cancels click activation. Input appearance also opens independently on
            focus or typing.
        </Typography.Text>

        <CodeBlock
            code={`import * as Combobox from '$lib/mielui/components/combobox';\n\nlet selected = $state('next');\n\n<Combobox.Root bind:value={selected}>\n  <Combobox.Trigger placeholder="Framework" />\n  <Combobox.Content>\n    <Combobox.Results>\n      <Combobox.Item value="next" label="Next.js" />\n    </Combobox.Results>\n  </Combobox.Content>\n</Combobox.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <!-- Basic -->
        <div id="basic" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Basic usage</Typography.H3>
            <ComponentPreview code={BasicSrc}>
                <Basic />
            </ComponentPreview>
        </div>

        <div id="input-search" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Input search</Typography.H3>
            <Typography.Text variant="supporting">
                Set{' '}
                <Typography.InlineCode>appearance="input"</Typography.InlineCode> for a field-styled
                trigger that stays editable and opens on focus or typing instead of click-toggle.
                Pass a
                <Typography.InlineCode>trailing</Typography.InlineCode>
                snippet for an adornment; there is no chevron by default.
            </Typography.Text>
            <ComponentPreview code={InputSearchSrc}>
                <InputSearch />
            </ComponentPreview>
        </div>

        <div id="menu-search" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Search in the menu</Typography.H3>
            <Typography.Text variant="supporting">
                Keep the trigger select-like and place the search field in the menu.
            </Typography.Text>
            <ComponentPreview code={MenuSearchSrc}>
                <MenuSearch />
            </ComponentPreview>
        </div>

        <div id="scrollable" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Scrollable</Typography.H3>
            <Typography.Text variant="supporting">
                Long result lists stay in a height-capped menu and scroll inside it.
            </Typography.Text>
            <ComponentPreview code={ScrollableSrc}>
                <Scrollable />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on Combobox.Content for a translucent background with blur. Solid
            remains the default. The glass surface keeps an opaque fallback when backdrop filtering
            is unavailable and respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
</div>
