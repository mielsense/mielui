<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add reorder-list';

    import Additional from './examples/handles.svelte';
    import AdditionalSrc from './examples/handles.svelte?raw';
</script>

<svelte:head>
    <title>Mielui · Reorder List</title>
    <meta name="description" content="Reorder controlled items with pointer or keyboard input." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Reorder List">
        Reorder rows by dragging them into the gap between neighboring items.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>

    <section id="composition" class="flex flex-col gap-4">
        <Typography.H2>Separate handles and content</Typography.H2>
        <Typography.Text>
            Drag the handle or focus it and press Space to pick up a row. Content remains selectable
            and may contain links or controls. The default data form uses Item, Handle, and Content.
            Supply row to rearrange those same parts; every row needs an Item with its stable id and
            accessible label.
        </Typography.Text>
        <CodeBlock
            code={`import * as ReorderList from '@mielui/svelte/components/reorder-list';

<ReorderList.Root bind:items getId={(item) => item.id} getLabel={(item) => item.name} label="Priority">
  {#snippet row(item)}
    <ReorderList.Item id={item.id} label={item.name}>
      <ReorderList.Content>{item.name}</ReorderList.Content>
      <ReorderList.Handle />
    </ReorderList.Item>
  {/snippet}
</ReorderList.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Bind the controlled array for live movement. Use
            <Typography.InlineCode>onCommit</Typography.InlineCode>
            for persistence so a drag writes once rather than on every crossing. Drag the handle
            with a mouse, pen, or touch. Row content remains interactive; a grabbed row keeps its
            raised surface and primary border until dropped.
        </Typography.Text>
        <Typography.Text variant="supporting">
            External changes to list membership or order cancel the active gesture. Cancel restores
            the original order of items that still exist. It preserves updated item data and keeps
            items added during the gesture.
        </Typography.Text>
        <CodeBlock
            lang="svelte"
            copy="overlay"
            code={`<ReorderList bind:items getId={(item) => item.id} getLabel={(item) => item.name} label="Pipeline steps">
  {#snippet children(item)}
    <span>{item.name}</span>
  {/snippet}
</ReorderList>`}
        />
    </section>
    <section id="handles" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Handle after content</Typography.H2>
        <ComponentPreview code={AdditionalSrc}><Additional /></ComponentPreview>
    </section>
    <section id="working-example" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Persist the committed order</Typography.H2>
        <Typography.Text>
            Use stable IDs for records and save the final array from onCommit. Keyboard users can
            lift an item, move it, and cancel without saving a partial order. Keep unrelated links
            and buttons outside the drag handle, as shown in the custom composition.
        </Typography.Text>
    </section>
</div>
