<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Group from '@mielui/svelte/components/group';
    import { Input } from '@mielui/svelte/components/input';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
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
    <section id="hero" class="flex scroll-mt-20 flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {@const separatorOrientation =
                    values.orientation === 'vertical' ? 'horizontal' : 'vertical'}
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
    <section id="installation" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add group" />
    </section>
    <section id="usage" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage and accessibility</Typography.H2>
        <Typography.Text>
            Horizontal groups align input and trigger heights to their button size. Use the same
            size for every trigger in a group; fields follow that size. Add Group.Separator between
            controls to keep a single seam.
        </Typography.Text>
        <Typography.Text>
            Compose Group.Root with controls as direct children. Put Group.Separator between each
            control, including outline buttons. Label the root with aria-label or aria-labelledby.
            Tab moves between controls normally. Separators own the visible dividers; Group only
            joins the control edges and keeps focused controls above their neighbors.
        </Typography.Text>
        <Typography.Text>
            Use Group for actions and ToggleGroup for controls that select a state. Group does not
            add arrow-key navigation or selection.
        </Typography.Text>
    </section>
    <section id="undo-and-redo" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Undo and redo</Typography.H2>
        <Typography.Text>
            Two joined buttons step through a list of revisions and disable at each end.
        </Typography.Text>
        <ComponentPreview code={BasicSrc}><Basic /></ComponentPreview>
    </section>
    <section id="vertical" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Vertical</Typography.H2>
        <Typography.Text>
            Root orientation defaults to horizontal. Use vertical with horizontal separators to
            stack controls.
        </Typography.Text>
        <ComponentPreview code={VerticalSrc}><Vertical /></ComponentPreview>
    </section>
    <section id="text" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Text and labels</Typography.H2>
        <Typography.Text>
            Group.Text renders a div by default. Set as="label" and for when the prefix names an
            input. Text can also follow the control as a suffix.
        </Typography.Text>
        <ComponentPreview code={TextSrc}><Text /></ComponentPreview>
    </section>
    <section id="with-input" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">With input</Typography.H2>
        <ComponentPreview code={WithInputSrc}><WithInput /></ComponentPreview>
    </section>
    <section id="nested" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Nested groups</Typography.H2>
        <ComponentPreview code={NestedSrc}><Nested /></ComponentPreview>
    </section>
    <section id="with-popup" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">With popup</Typography.H2>
        <ComponentPreview code={PopupSrc}><Popup /></ComponentPreview>
    </section>
    <section id="with-menu" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">With menu</Typography.H2>
        <ComponentPreview code={MenuSrc}><Menu /></ComponentPreview>
    </section>
    <section id="composition" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Composition</Typography.H2>
        <Typography.Text>
            Text is optional. Controls keep their own sizes, variants, focus rings, events and
            disabled states. Joined controls share one hairline seam and flat adjoining corners, and
            the outer ends keep the control radius. Filled buttons keep their lit edge and sit flush
            with the frame. Group does not replace a variant’s surface treatment. Hidden form inputs
            do not affect which visible control receives rounded ends. Nested Group.Root elements
            retain separate rounded ends with a gap between groups. Set class on any part to restyle
            it.
        </Typography.Text>
        <Typography.Text>
            Root and Separator accept orientation="horizontal" or "vertical". Separator defaults to
            vertical and is hidden from assistive technology. Text accepts an HTML tag through as.
            Native attributes and event handlers pass through to each part.
        </Typography.Text>
    </section>
</div>
