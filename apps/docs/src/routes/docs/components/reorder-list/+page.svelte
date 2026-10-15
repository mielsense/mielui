<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as ReorderList from '@mielui/svelte/components/reorder-list';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Agenda from './examples/agenda.svelte';
    import AgendaSrc from './examples/agenda.svelte?raw';
    import EventsExample from './examples/events.svelte';
    import EventsExampleSrc from './examples/events.svelte?raw';
    import Handles from './examples/handles.svelte';
    import HandlesSrc from './examples/handles.svelte?raw';
    import { agenda, code as playgroundCode, controls as playgroundControls } from './playground';

    type AgendaItem = (typeof agenda)[number];

    let playgroundItems = $state([...agenda]);

    const usageCode = `<script lang="ts">
    import * as ReorderList from '@mielui/svelte/components/reorder-list';

    let items = $state([
        {
            id: 'lint',
            name: 'Lint'
        },
        {
            id: 'test',
            name: 'Test'
        },
        {
            id: 'deploy',
            name: 'Deploy'
        }
    ]);
</${'script'}>

<ReorderList.Root
    bind:items
    getId={(item) => item.id}
    getLabel={(item) => item.name}
    label="Pipeline steps"
>
    {#snippet children(item)}
        <span>{item.name}</span>
    {/snippet}
</ReorderList.Root>`;

    const labelsCode = `<script lang="ts">
    import type { ReorderListLabels } from '@mielui/svelte/components/reorder-list';

    const labels: ReorderListLabels = {
        hint: 'Faites glisser pour réordonner.',
        dropped: (item, position) => \`\${item} déposé en position \${position}.\`
    };
</${'script'}>

<ReorderList.Root bind:items {getId} {getLabel} label="Priorités" {labels}>
    …
</ReorderList.Root>`;
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
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#snippet content(item: AgendaItem)}
                    <span class="flex min-w-0 items-center justify-between gap-4">
                        <span class="truncate font-medium">{item.name}</span>
                        <span class="shrink-0 text-xs text-foreground-muted tabular-nums">
                            {item.duration}
                        </span>
                    </span>
                {/snippet}
                {const root = $derived({
                    getId: (item: AgendaItem) => item.id,
                    getLabel: (item: AgendaItem) => item.name,
                    label: 'Meeting agenda',
                    disabled: values.disabled,
                    class: 'w-full max-w-sm'
                })}
                {#if values.handle === 'end'}
                    <ReorderList.Root bind:items={playgroundItems} {...root}>
                        {#snippet row(item)}
                            <ReorderList.Item id={item.id} label={item.name}>
                                <ReorderList.Content class="ps-1.5">
                                    {@render content(item)}
                                </ReorderList.Content>
                                <ReorderList.Handle />
                            </ReorderList.Item>
                        {/snippet}
                    </ReorderList.Root>
                {:else}
                    <ReorderList.Root bind:items={playgroundItems} {...root}>
                        {#snippet children(item)}
                            {@render content(item)}
                        {/snippet}
                    </ReorderList.Root>
                {/if}
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add reorder-list" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `items` for live movement and give each item a stable id with `getId` and a spoken name with `getLabel`. Use `onCommit` to persist, so a drag writes once rather than on every crossing. Drag the handle with a mouse, pen, or touch; row content stays interactive."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            External changes to list membership or order cancel the active gesture. Cancel restores
            the original order of items that still exist. It keeps updated item data and items added
            during the gesture.
        </Typography.Text>
        <CodeBlock lang="svelte" copy="overlay" code={usageCode} />
    </section>

    <section id="composition" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Composition</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"With `children`, each row renders `ReorderList.Item` with a `Handle` before `Content`. Pass `row` instead to arrange those parts yourself; every row needs an `Item` with its stable `id` and accessible `label`. Drag the handle, or focus it and press Space, to pick up a row. Keep links and buttons in `Content`, outside the handle."}
            />
        </Typography.Text>
        <CodeBlock
            code={`<ReorderList.Root
    bind:items
    getId={(item) => item.id}
    getLabel={(item) => item.name}
    label="Priority"
>
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

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="agenda-with-reset" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Agenda with reset</Typography.H3>
            <Typography.Text variant="supporting">
                A Reset button restores the starting order, and a hint explains the keyboard
                controls.
            </Typography.Text>
            <ComponentPreview code={AgendaSrc}>
                <Agenda />
            </ComponentPreview>
        </div>

        <div id="handle-after-content" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Handle after content</Typography.H3>
            <ComponentPreview code={HandlesSrc}>
                <Handles />
            </ComponentPreview>
        </div>

        <div id="save-and-lock" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Save and lock the order</Typography.H3>
            <ComponentPreview code={EventsExampleSrc}>
                <EventsExample />
            </ComponentPreview>
        </div>
    </section>

    <section id="events-and-disabling" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Events and disabling</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`onReorder` runs with the new array after every move, from a drag or the keyboard. `onCommit` runs once when a move is dropped or confirmed; save the final array there. Keyboard users can lift a row, move it, and press Escape to cancel without saving a partial order. `disabled` on Root locks the list: rows stay visible and nothing can be moved."}
            />
        </Typography.Text>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Built-in text is English by default. Pass a `labels` object of type `ReorderListLabels` to translate the keyboard hint and the announcements made while a row moves: `hint`, `grabbed`, `moved`, `dropped`, `cancelled`, and `cancelledByChange`. Every key is optional; omitted keys keep their default."}
            />
        </Typography.Text>
        <CodeBlock code={labelsCode} lang="svelte" copy="overlay" />
    </section>
</div>
