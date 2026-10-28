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
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Multiple from './examples/multiple.svelte';
    import MultipleSrc from './examples/multiple.svelte?raw';
    import Single from './examples/single.svelte';
    import SingleSrc from './examples/single.svelte?raw';
    import Sizes from './examples/sizes.svelte';
    import SizesSrc from './examples/sizes.svelte?raw';
    import { ITEMS, code as playgroundCode, controls as playgroundControls } from './playground';

    const icons: Record<string, typeof Bold> = {
        AlignCenter,
        AlignLeft,
        AlignRight,
        Bold,
        Italic,
        Underline
    };

    let alignment = $state<string | undefined>('center');
    let formatting = $state(['bold']);

    const usageCode = `<script lang="ts">
    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';

    let alignment = $state<string | undefined>('left');
</${'script'}>

<ToggleGroup.Root bind:value={alignment} aria-label="Text alignment">
    <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
    <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
    <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
</ToggleGroup.Root>`;
</script>

<svelte:head>
    <title>Mielui · Toggle Group</title>
    <meta name="description" content="A row of toggles with shared selection state." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Toggle Group">
        A row of toggles with shared selection, for single or multiple choice.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {const items = $derived(ITEMS[values.type])}
                {#snippet toggles()}
                    {#each items as item, index (item.value)}
                        <ToggleGroup.Item
                            value={item.value}
                            aria-label={values.content === 'icon' ? item.label : undefined}
                            disabled={values.disabledItem && index === items.length - 1}
                        >
                            {#if values.content === 'icon'}
                                <HugeiconsIcon icon={icons[item.icon]} size={14} />
                            {:else}
                                {item.text}
                            {/if}
                        </ToggleGroup.Item>
                    {/each}
                {/snippet}
                {#if values.type === 'multiple'}
                    <ToggleGroup.Root
                        type="multiple"
                        bind:value={formatting}
                        size={values.size}
                        disabled={values.disabled}
                        aria-label="Text formatting"
                    >
                        {@render toggles()}
                    </ToggleGroup.Root>
                {:else}
                    <ToggleGroup.Root
                        type="single"
                        bind:value={alignment}
                        size={values.size}
                        disabled={values.disabled}
                        aria-label="Text alignment"
                    >
                        {@render toggles()}
                    </ToggleGroup.Root>
                {/if}
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add toggle-group" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={'By default one item can be on at a time: `value` is a string, and pressing the active item clears it to `undefined`. With `type="multiple"`, `value` is an array of the pressed items. `value` and `onValueChange` follow the type you choose.'}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            <InlineText
                text={'Give the group a name with `aria-label`, or point `aria-labelledby` at a visible label. The group is one tab stop, and arrow keys move between enabled items. `disabled` on Root turns off every item, and `disabled` on an Item turns off that one.'}
            />
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="paragraph-alignment" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Paragraph alignment</Typography.H3>
            <Typography.Text variant="supporting">
                The selected item sets how the paragraph below is aligned.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="single" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Single select</Typography.H3>
            <ComponentPreview code={SingleSrc}>
                <Single />
            </ComponentPreview>
        </div>

        <div id="multiple" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Multiple select</Typography.H3>
            <ComponentPreview code={MultipleSrc}>
                <Multiple />
            </ComponentPreview>
        </div>

        <div id="sizes" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Sizes</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'Set `size` on Root and every item follows it. The default is `sm`.'}
                />
            </Typography.Text>
            <ComponentPreview code={SizesSrc}>
                <Sizes />
            </ComponentPreview>
        </div>
    </section>
</div>
