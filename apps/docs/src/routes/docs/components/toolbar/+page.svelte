<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Toolbar from '@mielui/svelte/components/toolbar';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Depth from './examples/depth.svelte';
    import DepthSrc from './examples/depth.svelte?raw';
    import Additional from './examples/formatting.svelte';
    import AdditionalSrc from './examples/formatting.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    let playgroundFormats = $state<string[]>(['bold']);
    let playgroundFormat = $state('bold');
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
        Composable keyboard toolbar with buttons, links, and selectable groups.
    </PageIntro>
    <section id="hero" class="flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#snippet items()}
                    <Toolbar.Item value="bold">Bold</Toolbar.Item>
                    <Toolbar.Item value="italic">Italic</Toolbar.Item>
                    <Toolbar.Item value="underline" disabled={values.disabled}>
                        Underline
                    </Toolbar.Item>
                {/snippet}
                <Toolbar.Root
                    aria-label="Text formatting"
                    variant={values.variant}
                    orientation={values.orientation}
                    loop={values.loop}
                >
                    {#if values.type === 'multiple'}
                        <Toolbar.Group
                            type="multiple"
                            bind:value={playgroundFormats}
                            aria-label="Text styles"
                            class={values.orientation === 'vertical' ? 'flex-col' : undefined}
                        >
                            {@render items()}
                        </Toolbar.Group>
                    {:else}
                        <Toolbar.Group
                            type="single"
                            bind:value={playgroundFormat}
                            aria-label="Text styles"
                            class={values.orientation === 'vertical' ? 'flex-col' : undefined}
                        >
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
    <section id="installation" class="flex flex-col gap-4">
        <Typography.H2>Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add toolbar" />
    </section>
    <section id="usage" class="flex flex-col gap-4">
        <Typography.H2>Usage</Typography.H2>
        <Typography.Text>
            Toolbars are flat by default: a grey track holding ghost keys, with one hover wash that
            travels between them and a lit pill on each selected Item. Set variant="depth" on
            Toolbar.Root to opt into a floating shell with raised keys and recessed selections.
            Button, Link, and Item inherit the variant. Depth follows the theme's shadow,
            edge-highlight, and reduced-motion settings. Both examples include zoom controls with
            number shuffle for the changing percentage. Tooltips use the input surface colors.
        </Typography.Text>
        <Typography.Text>
            Import the component subpath as a namespace. Root owns one roving keyboard collection:
            compose Button, Link, Separator, and Group containing Item. Give Root an aria-label or
            aria-labelledby. Set orientation to vertical for vertical arrow navigation, and loop to
            false to stop at the ends. Disabled items are skipped. Each interactive part forwards
            native attributes and bind:element.
        </Typography.Text>
        <CodeBlock
            code={`import * as Toolbar from '@mielui/svelte/components/toolbar';\n\nlet formats = $state<string[]>([]);\n\n<Toolbar.Root aria-label="Text formatting">\n  <Toolbar.Group type="multiple" bind:value={formats} aria-label="Text styles">\n    <Toolbar.Item value="bold">Bold</Toolbar.Item>\n    <Toolbar.Item value="italic">Italic</Toolbar.Item>\n  </Toolbar.Group>\n  <Toolbar.Separator />\n  <Toolbar.Button onclick={() => (formats = [])}>Clear</Toolbar.Button>\n  <Toolbar.Link href="/docs">Help</Toolbar.Link>\n</Toolbar.Root>`}
            lang="svelte"
            copy="overlay"
        />
        <Typography.Text>
            Group is a selectable group: use type="single" with a string value, or type="multiple"
            with a string array. Both support bind:value, onValueChange, and disabled. Item requires
            a value and renders a pressed button. Plain visual grouping can use a div without
            introducing another keyboard collection. Separator automatically runs perpendicular to
            the toolbar.
        </Typography.Text>
        <Typography.Text>
            Omit a group, reorder Link before Button, or restyle any part with class. Use the
            toolbar's Item for selections instead of nesting an independent ToggleGroup keyboard
            collection. The existing callable Toolbar export and composer navigation remain
            available for existing integrations; new compositions use Toolbar.Root from the
            component subpath.
        </Typography.Text>
    </section>
    <section id="design-tools" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Design tools</Typography.H2>
        <Typography.Text variant="supporting">
            Icon tools with shortcut tooltips sit beside zoom buttons, and a status line names the
            selected tool.
        </Typography.Text>
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>
    <section id="depth" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Depth variant</Typography.H2>
        <ComponentPreview code={DepthSrc}><Depth /></ComponentPreview>
    </section>
    <section id="formatting" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Multiple selections</Typography.H2>
        <ComponentPreview code={AdditionalSrc}><Additional /></ComponentPreview>
    </section>
    <section id="working-example" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Selection and commands</Typography.H2>
        <Typography.Text>
            Use Item inside a single or multiple Group for persistent choices. Use Toolbar.Button
            for a one-time action such as Clear. Label the toolbar and each icon-only control; the
            examples display the selected tool or apply formatting to a sample sentence.
        </Typography.Text>
    </section>
    <section id="parts" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Group, Item, Button and Link render their `children` and accept `style` for inline styles next to `class`. Separator draws the line between groups. It is announced as a separator by default. Set `decorative` when the line is only visual, so screen readers skip it. Toolbar is a second, simpler container. It is a plain element with the toolbar role and arrow-key navigation between whatever controls you put in its `children`, for a bar built from ordinary buttons."}
            />
        </Typography.Text>
    </section>
</div>
