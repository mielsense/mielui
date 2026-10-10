<script lang="ts">
    import {
        TextAlignCenterIcon as AlignCenter,
        TextAlignLeftIcon as AlignLeft,
        TextAlignRightIcon as AlignRight,
        TextBoldIcon as Bold,
        TextItalicIcon as Italic,
        TextUnderlineIcon as Underline
    } from '@hugeicons/core-free-icons';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';

    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Multiple from './examples/multiple.svelte';
    import MultipleSrc from './examples/multiple.svelte?raw';
    import Single from './examples/single.svelte';
    import SingleSrc from './examples/single.svelte?raw';
    import Sizes from './examples/sizes.svelte';
    import SizesSrc from './examples/sizes.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const TITLE = 'Toggle Group';
    const SLUG = 'toggle-group';

    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;

    const alignments = [
        {
            value: 'left',
            text: 'Left',
            label: 'Align left',
            icon: AlignLeft
        },
        {
            value: 'center',
            text: 'Center',
            label: 'Align center',
            icon: AlignCenter
        },
        {
            value: 'right',
            text: 'Right',
            label: 'Align right',
            icon: AlignRight
        }
    ];
    const formats = [
        {
            value: 'bold',
            text: 'Bold',
            label: 'Bold',
            icon: Bold
        },
        {
            value: 'italic',
            text: 'Italic',
            label: 'Italic',
            icon: Italic
        },
        {
            value: 'underline',
            text: 'Underline',
            label: 'Underline',
            icon: Underline
        }
    ];

    let alignment = $state<string | undefined>('center');
    let formatting = $state(['bold']);
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta name="description" content="A row of toggles with shared selection state." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title={TITLE}>
        A row of toggles with shared selection, for single or multiple choice.
    </PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#if values.type === 'multiple'}
                    <ToggleGroup.Root
                        type="multiple"
                        bind:value={formatting}
                        size={values.size}
                        disabled={values.disabled}
                        aria-label="Text formatting"
                    >
                        {#each formats as item, index (item.value)}
                            <ToggleGroup.Item
                                value={item.value}
                                aria-label={values.content === 'icon' ? item.label : undefined}
                                disabled={values.disabledItem && index === formats.length - 1}
                            >
                                {#if values.content === 'icon'}
                                    <HugeiconsIcon icon={item.icon} size={14} />
                                {:else}
                                    {item.text}
                                {/if}
                            </ToggleGroup.Item>
                        {/each}
                    </ToggleGroup.Root>
                {:else}
                    <ToggleGroup.Root
                        type="single"
                        bind:value={alignment}
                        size={values.size}
                        disabled={values.disabled}
                        aria-label="Text alignment"
                    >
                        {#each alignments as item, index (item.value)}
                            <ToggleGroup.Item
                                value={item.value}
                                aria-label={values.content === 'icon' ? item.label : undefined}
                                disabled={values.disabledItem && index === alignments.length - 1}
                            >
                                {#if values.content === 'icon'}
                                    <HugeiconsIcon icon={item.icon} size={14} />
                                {:else}
                                    {item.text}
                                {/if}
                            </ToggleGroup.Item>
                        {/each}
                    </ToggleGroup.Root>
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
            Arrow keys navigate enabled items with a single tab stop. Single mode allows the active
            item to be cleared; multiple mode keeps an array of selected values. Items share one
            track: in single mode the selected pill travels between items, and in multiple mode each
            pressed item is its own pill.
        </Typography.Text>

        <Typography.Text variant="supporting">
            Single mode uses a string value and reports undefined when cleared. With
            type="multiple", bind a string array; clearing all selections reports an empty array.
            The value and onValueChange types follow the selected mode.
        </Typography.Text>
        <CodeBlock
            code={`import * as ToggleGroup from '@mielui/svelte/components/toggle-group';\n\n<ToggleGroup.Root type="single" bind:value={alignment}>\n  <ToggleGroup.Item value="left">Left</ToggleGroup.Item>\n  <ToggleGroup.Item value="center">Center</ToggleGroup.Item>\n  <ToggleGroup.Item value="right">Right</ToggleGroup.Item>\n</ToggleGroup.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Toggle Group in single and multiple modes.
            {/snippet}
        </SectionHeading>

        <div id="paragraph-alignment" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Paragraph alignment</Typography.H3>
            <Typography.Text variant="supporting">
                The selected item sets how the paragraph below is aligned.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <!-- Single select -->
        <div id="single" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Single select</Typography.H3>
            <ComponentPreview code={SingleSrc}>
                <Single />
            </ComponentPreview>
        </div>

        <!-- Multiple select -->
        <div id="multiple" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Multiple select</Typography.H3>
            <ComponentPreview code={MultipleSrc}>
                <Multiple />
            </ComponentPreview>
        </div>

        <div id="sizes" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Sizes</Typography.H3>
            <Typography.Text variant="supporting">
                Set size on Root. Every item inherits it; the default is sm.
            </Typography.Text>
            <ComponentPreview code={SizesSrc}>
                <Sizes />
            </ComponentPreview>
        </div>
    </section>
    <section id="naming-and-disabling" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Naming and disabling</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"A toggle group needs a name. Pass `aria-label`, or point `aria-labelledby` at the id of a visible label. `disabled` on Root turns off every item, and `disabled` on one Item turns off just that one."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root and Item render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>
</div>
