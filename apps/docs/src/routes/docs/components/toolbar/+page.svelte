<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Toolbar from '@mielui/svelte/components/toolbar';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Depth from './examples/depth.svelte';
    import DepthSrc from './examples/depth.svelte?raw';
    import Formatting from './examples/formatting.svelte';
    import FormattingSrc from './examples/formatting.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    let playgroundFormats = $state<string[]>(['bold']);
    let playgroundFormat = $state('bold');

    const usageCode = `<script lang="ts">
    import * as Toolbar from '@mielui/svelte/components/toolbar';

    let formats = $state<string[]>([]);

    function clear() {
        formats = [];
    }
</${'script'}>

<Toolbar.Root aria-label="Text formatting">
    <Toolbar.Group type="multiple" bind:value={formats} aria-label="Text styles">
        <Toolbar.Item value="bold">Bold</Toolbar.Item>
        <Toolbar.Item value="italic">Italic</Toolbar.Item>
    </Toolbar.Group>
    <Toolbar.Separator />
    <Toolbar.Button onclick={clear}>Clear</Toolbar.Button>
    <Toolbar.Link href="/docs">Help</Toolbar.Link>
</Toolbar.Root>`;
</script>

<svelte:head>
    <title>Mielui · Toolbar</title>
    <meta
        name="description"
        content="Composable keyboard toolbar with buttons, links, and selectable groups."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Toolbar">
        A row of buttons, links, and selectable groups that arrow keys move between.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#snippet items()}
                    <Toolbar.Item value="bold">Bold</Toolbar.Item>
                    <Toolbar.Item value="italic">Italic</Toolbar.Item>
                    <Toolbar.Item value="underline" disabled={values.disabled}>
                        Underline
                    </Toolbar.Item>
                {/snippet}
                {const group = $derived({
                    'aria-label': 'Text styles',
                    class: values.orientation === 'vertical' ? 'flex-col' : undefined
                })}
                <Toolbar.Root
                    aria-label="Text formatting"
                    variant={values.variant}
                    orientation={values.orientation}
                >
                    {#if values.type === 'multiple'}
                        <Toolbar.Group type="multiple" bind:value={playgroundFormats} {...group}>
                            {@render items()}
                        </Toolbar.Group>
                    {:else}
                        <Toolbar.Group type="single" bind:value={playgroundFormat} {...group}>
                            {@render items()}
                        </Toolbar.Group>
                    {/if}
                    {#if values.separator}
                        <Toolbar.Separator />
                    {/if}
                    <Toolbar.Button
                        onclick={() => {
                            playgroundFormats = [];
                            playgroundFormat = '';
                        }}
                    >
                        Clear
                    </Toolbar.Button>
                    {#if values.link}
                        <Toolbar.Link href="/docs/components/toolbar">Help</Toolbar.Link>
                    {/if}
                </Toolbar.Root>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add toolbar" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={'Root holds one keyboard collection of Buttons, Links, Separators, and Groups of Items. Tab enters the toolbar once and arrow keys move along it, skipping disabled controls and wrapping at the ends unless `loop` is `false`. Give Root an `aria-label` or `aria-labelledby`, and label every icon-only control.'}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            <InlineText
                text={'Use Items inside a Group for choices that stay selected: `type="single"` with a string `value`, or `type="multiple"` with an array. Use Button for one-off actions such as Clear. Separator runs perpendicular to the toolbar; set `decorative` when it is only visual. Every part takes `class` and `bind:element`. Use Items for selections instead of nesting a ToggleGroup, which would add a second keyboard collection.'}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={'The package also exports a plain `Toolbar`: a styled element with the toolbar role and arrow-key navigation between whatever buttons you put in it.'}
            />
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="design-tools" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Design tools</Typography.H3>
            <Typography.Text variant="supporting">
                Icon tools with shortcut tooltips sit beside zoom buttons, and a status line names
                the selected tool.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="depth" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Depth</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'The default toolbar is a flat grey track with one hover wash that travels between keys. `variant="depth"` floats it on a raised shell with raised keys and recessed selections. Depth follows the shadow and motion settings of the theme.'}
                />
            </Typography.Text>
            <ComponentPreview code={DepthSrc}>
                <Depth />
            </ComponentPreview>
        </div>

        <div id="multiple-selection" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Multiple selection</Typography.H3>
            <ComponentPreview code={FormattingSrc}>
                <Formatting />
            </ComponentPreview>
        </div>
    </section>
</div>
