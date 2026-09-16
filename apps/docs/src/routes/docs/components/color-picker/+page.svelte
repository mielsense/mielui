<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Composition from './examples/composition.svelte';
    import CompositionSrc from './examples/composition.svelte?raw';
    import Default from './examples/default.svelte';
    import DefaultSrc from './examples/default.svelte?raw';
    import Formats from './examples/formats.svelte';
    import FormatsSrc from './examples/formats.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import WithPresets from './examples/with-presets.svelte';
    import WithPresetsSrc from './examples/with-presets.svelte?raw';

    const TITLE = 'Color Picker';
    const SLUG = 'color-picker';

    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta name="description" content="Inline hex color picker with optional presets." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>
                {TITLE}
            </Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                A hex color picker with HSL, RGB, or HSV channel controls and optional preset
                swatches.
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
            The hex field and every color channel have accessible names. Channel sliders provide a
            keyboard alternative to the pointer plane. The root label names the trigger, and preset
            selection respects reduced motion. The plane also exposes saturation and brightness to
            keyboard users. Hue adjustments preserve zero saturation; increase saturation to reveal
            the selected hue.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Compose the Color Picker from its{' '}
            <Typography.InlineCode>Root</Typography.InlineCode>
            ,
            <Typography.InlineCode>Trigger</Typography.InlineCode>
            , and
            <Typography.InlineCode>Content</Typography.InlineCode>
            parts:
        </Typography.Text>
        <CodeBlock
            code={`import * as ColorPicker from '$lib/mielui/components/color-picker';\n\nlet value = $state('#5e6ad2');\n\n<ColorPicker.Root value={value} onValueChange={(v) => (value = v)} format="hsl">\n\t<ColorPicker.Trigger />\n\t<ColorPicker.Content />\n</ColorPicker.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="composition" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Custom composition</Typography.H3>
            <Typography.Text variant="supporting">
                Content defaults to Plane, Preview, Hue, HexInput, Channels, and Presets. Supply
                children to omit, reorder, or style those same parts. Every part reads one shared
                color state from Root. Here, presets come first and the plane and hue strip are
                omitted. Channels uses the Root format; Presets uses its options.
            </Typography.Text>
            <ComponentPreview code={CompositionSrc}><Composition /></ComponentPreview>
        </div>

        <!-- Default -->
        <div id="default" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Default</Typography.H3>
            <ComponentPreview code={DefaultSrc}>
                <Default />
            </ComponentPreview>
        </div>

        <!-- Channel formats -->
        <div id="formats" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Channel formats</Typography.H3>
            <ComponentPreview code={FormatsSrc}>
                <Formats />
            </ComponentPreview>
        </div>

        <!-- With presets -->
        <div id="with-presets" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With preset swatches</Typography.H3>
            <ComponentPreview code={WithPresetsSrc}>
                <WithPresets />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on ColorPicker.Content for a translucent background with blur. Solid
            remains the default. The glass surface keeps an opaque fallback when backdrop filtering
            is unavailable and respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
</div>
