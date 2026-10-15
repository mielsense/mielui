<script lang="ts">
    import { TextBoldIcon as Bold } from '@hugeicons/core-free-icons';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Toggle } from '@mielui/svelte/components/toggle';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import Events from './examples/events.svelte';
    import EventsSrc from './examples/events.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Icon from './examples/icon.svelte';
    import IconSrc from './examples/icon.svelte?raw';
    import Sizes from './examples/sizes.svelte';
    import SizesSrc from './examples/sizes.svelte?raw';
    import Text from './examples/text.svelte';
    import TextSrc from './examples/text.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usageCode = `<script lang="ts">
    import { TextBoldIcon as Bold } from '@hugeicons/core-free-icons';
    import { Toggle } from '@mielui/svelte/components/toggle';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let bold = $state(false);
</${'script'}>

<Toggle bind:pressed={bold} aria-label="Bold">
    <HugeiconsIcon icon={Bold} size={14} />
</Toggle>`;
</script>

<svelte:head>
    <title>Mielui · Toggle</title>
    <meta name="description" content="A two-state button that is pressed or unpressed." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Toggle">A button that stays pressed until it is pressed again.</PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <Toggle
                    variant={values.variant}
                    size={values.size}
                    pressed={values.pressed}
                    disabled={values.disabled}
                    aria-label={values.content === 'icon' ? 'Bold' : undefined}
                >
                    {#if values.content !== 'text'}
                        <HugeiconsIcon icon={Bold} size={14} />
                    {/if}
                    {#if values.content !== 'icon'}
                        Bold
                    {/if}
                </Toggle>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add toggle" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={'Bind `pressed` to read or set the state. Put a label or an icon in `children`, and give an icon-only toggle an `aria-label`.'}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="text-formatting" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Text formatting</Typography.H3>
            <Typography.Text variant="supporting">
                Three toggles set the style of the sentence below them.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="icon" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Icon toggle</Typography.H3>
            <ComponentPreview code={IconSrc}>
                <Icon />
            </ComponentPreview>
        </div>

        <div id="text" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Text toggle</Typography.H3>
            <ComponentPreview code={TextSrc}>
                <Text />
            </ComponentPreview>
        </div>

        <div id="sizes" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Sizes</Typography.H3>
            <ComponentPreview code={SizesSrc}>
                <Sizes />
            </ComponentPreview>
        </div>

        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled</Typography.H3>
            <ComponentPreview code={DisabledSrc}>
                <Disabled />
            </ComponentPreview>
        </div>

        <div id="events" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Events</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'`onPressedChange` runs with the new state on every press, for when you want to react without binding `pressed`.'}
                />
            </Typography.Text>
            <ComponentPreview code={EventsSrc}>
                <Events />
            </ComponentPreview>
        </div>
    </section>
</div>
