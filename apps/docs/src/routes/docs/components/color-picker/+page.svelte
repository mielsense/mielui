<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as ColorPicker from '@mielui/svelte/components/color-picker';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import Composition from './examples/composition.svelte';
    import CompositionSrc from './examples/composition.svelte?raw';
    import Default from './examples/default.svelte';
    import DefaultSrc from './examples/default.svelte?raw';
    import Formats from './examples/formats.svelte';
    import FormatsSrc from './examples/formats.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import WithPresets from './examples/with-presets.svelte';
    import WithPresetsSrc from './examples/with-presets.svelte?raw';
    import {
        CHANNELS_SEAM,
        isDefaultContent,
        code as playgroundCode,
        controls as playgroundControls,
        options as playgroundOptions
    } from './playground';

    let color = $state('#5e6ad2');

    const usageCode = `<script lang="ts">
    import * as ColorPicker from '@mielui/svelte/components/color-picker';

    let value = $state('#5e6ad2');
</${'script'}>

<ColorPicker.Root bind:value label="Accent color">
    <ColorPicker.Trigger />
    <ColorPicker.Content />
</ColorPicker.Root>`;

    const labelsCode = `<script lang="ts">
    import * as ColorPicker from '@mielui/svelte/components/color-picker';
    import type { ColorPickerLabels } from '@mielui/svelte/components/color-picker';

    const labels: ColorPickerLabels = {
        choose: 'Choisir une couleur',
        picker: 'Sélecteur de couleur',
        hex: 'Couleur hexadécimale',
        eyedropper: 'Prélever une couleur',
        trigger: (label, color) => \`\${label} : \${color}\`,
        hue: 'Teinte',
        saturation: 'Saturation',
        lightness: 'Luminosité',
        brightness: 'Valeur',
        red: 'Rouge',
        green: 'Vert',
        blue: 'Bleu'
    };

    let value = $state('');
</${'script'}>

<ColorPicker.Root bind:value {labels}>
    <ColorPicker.Trigger />
    <ColorPicker.Content />
</ColorPicker.Root>`;
</script>

<svelte:head>
    <title>Mielui · Color Picker</title>
    <meta
        name="description"
        content="A hex color picker with HSL, RGB or HSV channel controls and optional preset swatches."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Color Picker">
        A hex color picker with HSL, RGB or HSV channel controls and optional preset swatches.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {const surface = $derived(values.surface === 'theme' ? undefined : values.surface)}
                <ColorPicker.Root
                    bind:value={color}
                    label={values.label ? 'Accent color' : undefined}
                    options={values.presets ? playgroundOptions : undefined}
                    format={values.format}
                >
                    <ColorPicker.Trigger variant={values.variant} />
                    {#if isDefaultContent(values)}
                        <ColorPicker.Content {surface} />
                    {:else}
                        <ColorPicker.Content {surface}>
                            {#if values.plane}
                                <ColorPicker.Plane class="mx-1.5 mt-1.5 w-auto" />
                            {/if}
                            <div class="flex items-center gap-2.5 px-2.5 pt-2.5 pb-1">
                                <ColorPicker.Preview />
                                <div class="min-w-0 flex-1 space-y-2">
                                    <ColorPicker.Hue />
                                    <ColorPicker.HexInput />
                                </div>
                            </div>
                            {#if values.channels}
                                <ColorPicker.Channels
                                    class={values.presets ? CHANNELS_SEAM : undefined}
                                />
                            {/if}
                            {#if values.presets}
                                <ColorPicker.Presets />
                            {/if}
                        </ColorPicker.Content>
                    {/if}
                </ColorPicker.Root>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add color-picker" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Compose Root, Trigger and Content. Bind value to a six-digit hex string with its leading
            hash, such as #5e6ad2. Shorthand hex, named colors and other color formats are not
            parsed.
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            label prints a visible label above the trigger and names the trigger and panel. Give
            each picker a distinct label when several appear together. The hex field and every
            channel have accessible names, and the channel sliders are a keyboard alternative to the
            plane. Hue changes keep zero saturation, so raise saturation to see the hue.
        </Typography.Text>
    </section>

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
            <ComponentPreview code={CompositionSrc}>
                <Composition />
            </ComponentPreview>
        </div>

        <div id="default" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Default</Typography.H3>
            <ComponentPreview code={DefaultSrc}>
                <Default />
            </ComponentPreview>
        </div>

        <div id="formats" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Channel formats</Typography.H3>
            <Typography.Text variant="supporting">
                format picks the channel sliders: HSL, RGB or HSV. The value stays a hex string.
            </Typography.Text>
            <ComponentPreview code={FormatsSrc}>
                <Formats />
            </ComponentPreview>
        </div>

        <div id="with-presets" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With preset swatches</Typography.H3>
            <ComponentPreview code={WithPresetsSrc}>
                <WithPresets />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on Content for a translucent panel with blur, or surface="solid" for
            an opaque one. Without surface, the panel follows the theme. Glass falls back to an
            opaque panel when backdrop filtering is unavailable or reduced transparency is on.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}>
            <Glass />
        </ComponentPreview>
    </section>
    <section id="panel-behavior" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Panel behavior</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"In browsers with the EyeDropper API, currently Chrome and Edge on desktop, the hex field shows a pipette button that picks a color from anywhere on screen. Other browsers do not show the button. Content shares its panel with Popover. A press outside closes the picker unless you set `allowClickOutside={false}`. `dismissLayer={false}` removes the invisible layer that catches the first outside press. `focusTrap` and `lockScroll` decide whether Tab and page scrolling are held while it is open."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`portal={false}` renders the panel in place, which you need when the picker sits inside a dialog that traps focus. `refElement` anchors it to another element. `role` and `tabindex` set the panel's ARIA role and tab index, and `surfaceClass` styles the inner surface while `class` styles the frame."}
            />
        </Typography.Text>
    </section>
    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text>
            Built-in text is English. Pass a ColorPickerLabels object to labels on Root to translate
            the trigger text shown before a color is chosen, and the names of the panel, the hex
            input, the screen color button, and each slider and channel. trigger is a function of
            Root's label and the color, so a translation can reorder them. Every key is optional,
            and an omitted key keeps its English default.
        </Typography.Text>
        <CodeBlock code={labelsCode} lang="svelte" copy="overlay" />
    </section>
</div>
