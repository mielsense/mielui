<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Group from '@mielui/svelte/components/group';
    import { Input } from '@mielui/svelte/components/input';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import Basic from './examples/basic.svelte';
    import BasicSrc from './examples/basic.svelte?raw';
    import WithInput from './examples/input.svelte';
    import WithInputSrc from './examples/input.svelte?raw';
    import Menu from './examples/menu.svelte';
    import MenuSrc from './examples/menu.svelte?raw';
    import Nested from './examples/nested.svelte';
    import NestedSrc from './examples/nested.svelte?raw';
    import Popup from './examples/popup.svelte';
    import PopupSrc from './examples/popup.svelte?raw';
    import Text from './examples/text.svelte';
    import TextSrc from './examples/text.svelte?raw';
    import Vertical from './examples/vertical.svelte';
    import VerticalSrc from './examples/vertical.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const id = $props.id();

    const usageCode = `<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Group from '@mielui/svelte/components/group';
</${'script'}>

<Group.Root aria-label="Page navigation">
    <Button variant="outline">Previous</Button>
    <Group.Separator />
    <Button variant="outline">Next</Button>
</Group.Root>`;
</script>

<svelte:head>
    <title>Mielui · Group</title>
    <meta
        name="description"
        content="Connect related controls with separators and optional labels."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Group">Visually connect related controls.</PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {const separatorOrientation = $derived(
                    values.orientation === 'vertical' ? 'horizontal' : 'vertical'
                )}
                <Group.Root
                    orientation={values.orientation}
                    aria-label={values.content === 'input' ? 'Website' : 'Page navigation'}
                    class={values.content === 'input' ? 'w-full max-w-xs' : undefined}
                >
                    {#if values.text}
                        {#if values.content === 'input'}
                            <Group.Text as="label" for={id}>https://</Group.Text>
                        {:else}
                            <Group.Text>Page 2 of 8</Group.Text>
                        {/if}
                        {#if values.separators}
                            <Group.Separator orientation={separatorOrientation} />
                        {/if}
                    {/if}
                    {#if values.content === 'input'}
                        <Input
                            id={values.text ? id : undefined}
                            aria-label={values.text ? undefined : 'Website'}
                            placeholder="example.com"
                        />
                    {:else}
                        <Button variant={values.variant} size={values.size}>Previous</Button>
                    {/if}
                    {#if values.separators}
                        <Group.Separator orientation={separatorOrientation} />
                    {/if}
                    <Button variant={values.variant} size={values.size}>
                        {values.content === 'input' ? 'Visit' : 'Next'}
                    </Button>
                </Group.Root>
            {/snippet}
        </Playground>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add group" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Put controls directly inside Group.Root with a Group.Separator between each pair, including outline buttons; separators draw the seams. Name the group with `aria-label` or `aria-labelledby`. Tab moves between controls as usual."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            In a horizontal group, inputs and text match the height of the buttons. Give every
            button in a group the same size.
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Use Group for actions and [Toggle Group](/docs/components/toggle-group) for controls that select a state. Group adds no arrow-key navigation or selection."}
            />
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="undo-and-redo" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Undo and redo</Typography.H3>
            <Typography.Text variant="supporting">
                Two joined buttons step through a list of revisions and disable at each end.
            </Typography.Text>
            <ComponentPreview code={BasicSrc}>
                <Basic />
            </ComponentPreview>
        </div>

        <div id="vertical" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Vertical</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"Set `orientation=\"vertical\"` on Root and `orientation=\"horizontal\"` on each Separator to stack controls."}
                />
            </Typography.Text>
            <ComponentPreview code={VerticalSrc}>
                <Vertical />
            </ComponentPreview>
        </div>

        <div id="text" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Text and labels</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"Group.Text renders a div. Set `as=\"label\"` and `for` when the text labels an input."}
                />
            </Typography.Text>
            <ComponentPreview code={TextSrc}>
                <Text />
            </ComponentPreview>
        </div>

        <div id="with-input" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With input</Typography.H3>
            <ComponentPreview code={WithInputSrc}>
                <WithInput />
            </ComponentPreview>
        </div>

        <div id="nested" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Nested groups</Typography.H3>
            <Typography.Text variant="supporting">
                Nested roots keep their own rounded ends with a gap between them.
            </Typography.Text>
            <ComponentPreview code={NestedSrc}>
                <Nested />
            </ComponentPreview>
        </div>

        <div id="with-popup" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With popover</Typography.H3>
            <ComponentPreview code={PopupSrc}>
                <Popup />
            </ComponentPreview>
        </div>

        <div id="with-menu" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With menu</Typography.H3>
            <ComponentPreview code={MenuSrc}>
                <Menu />
            </ComponentPreview>
        </div>
    </section>

    <section id="composition" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Composition</Typography.H2>
        <Typography.Text variant="supporting">
            Controls keep their own sizes, variants, focus rings, events, and disabled states.
            Joined controls share one hairline seam and flat inner corners; the outer ends keep the
            control radius, and a focused control sits above its neighbors. Filled buttons keep
            their ring. Hidden form inputs do not affect which visible control gets the rounded
            ends.
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root and Separator take `orientation`, `horizontal` or `vertical`. Root defaults to horizontal and Separator to vertical; Separator is hidden from assistive technology. Text takes an element name through `as`. Every part passes native attributes, `class`, and event handlers to its element."}
            />
        </Typography.Text>
    </section>
</div>
