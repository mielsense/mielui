<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
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
    import Multiple from './examples/multiple.svelte';
    import MultipleSrc from './examples/multiple.svelte?raw';
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
    <PageIntro title={TITLE}>A searchable dropdown that filters options as you type.</PageIntro>

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
            The theme setting chrome.borders chooses "single" or "double" framing. Double is the
            default. Single removes the extra frame while preserving content padding, composition,
            and inset variants.
        </Typography.Text>
        <Typography.Text>
            Bind value to the selected option. Single selection is the default. Clicking an option
            or pressing Enter updates value and calls onValueChange. Keyboard navigation skips
            disabled options. Changing an item label updates the selected label without replacing an
            active search.
        </Typography.Text>
        <Typography.Text>
            Set name on Trigger to submit the selected value. Search text and labels are not
            submitted. Trigger renders an input by default, or a button with searchPlacement="menu".
            Its bind:element matches that element type.
        </Typography.Text>
        <Typography.Text>
            An item callback runs when that option changes the selection. Selecting the current
            option again in single mode closes the menu without reporting a value change. Call
            preventDefault() in Trigger's onclick to cancel click activation. Input appearance can
            still open on focus or typing. Trigger's disabled prop disables both editing and its
            clear action.
        </Typography.Text>

        <Typography.Text>
            Set<Typography.InlineCode>type="multiple"</Typography.InlineCode> on Root and bind a
            string array to value to choose several options. Selecting an item toggles it, clears
            the search, and keeps the menu open. The trigger lists selected labels; Escape or an
            outside click closes the menu. With name on Trigger, each selected value submits under
            that name.
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

        <div id="multiple" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Multiple selection</Typography.H3>
            <Typography.Text variant="supporting">
                Search for teams and toggle each selection without reopening the menu.
            </Typography.Text>
            <ComponentPreview code={MultipleSrc}>
                <Multiple />
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
            Set surface="glass" on Combobox.Content for a translucent background with blur. Omit
            surface to inherit --mielui-surface from your theme, or set surface="solid" to override
            it. The glass surface keeps an opaque fallback when backdrop filtering is unavailable
            and respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
</div>
