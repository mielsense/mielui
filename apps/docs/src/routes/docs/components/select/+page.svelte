<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Select from '@mielui/svelte/components/select';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import ControlledExample from './examples/controlled.svelte';
    import ControlledExampleSrc from './examples/controlled.svelte?raw';
    import DynamicWidth from './examples/dynamic-width.svelte';
    import DynamicWidthSrc from './examples/dynamic-width.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Multiple from './examples/multiple.svelte';
    import MultipleSrc from './examples/multiple.svelte?raw';
    import Scrollable from './examples/scrollable.svelte';
    import ScrollableSrc from './examples/scrollable.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    let playgroundPriority = $state('');
    let playgroundPriorities = $state<string[]>([]);

    const usageCode = `<script lang="ts">
    import * as Select from '@mielui/svelte/components/select';

    let role = $state('');
</${'script'}>

<Select.Root bind:value={role}>
    <Select.Trigger aria-label="Role">
        <Select.Value placeholder="Select a role" />
    </Select.Trigger>
    <Select.Content>
        <Select.Item value="designer">Designer</Select.Item>
        <Select.Item value="engineer">Engineer</Select.Item>
    </Select.Content>
</Select.Root>`;
</script>

<svelte:head>
    <title>Mielui · Select</title>
    <meta
        name="description"
        content="Single or multiple selection from a short, known option list."
    />
</svelte:head>

{#snippet playgroundItems(groupLabel: boolean, disabledItem: boolean)}
    {#if groupLabel}
        <Select.Label>Priority</Select.Label>
    {/if}
    <Select.Item value="urgent">Urgent</Select.Item>
    <Select.Item value="high">High</Select.Item>
    <Select.Item value="medium">Medium</Select.Item>
    <Select.Item value="low" disabled={disabledItem}>Low</Select.Item>
{/snippet}

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Select">
        A dropdown for choosing one or more options from a short list.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#snippet parts()}
                    <Select.Trigger
                        aria-label="Priority"
                        variant={values.variant}
                        size={values.size}
                        class="min-w-56"
                    >
                        <Select.Value placeholder={values.placeholder || undefined} />
                    </Select.Trigger>
                    <Select.Content
                        surface={values.surface === 'theme' ? undefined : values.surface}
                    >
                        {@render playgroundItems(values.groupLabel, values.disabledItem)}
                    </Select.Content>
                {/snippet}
                {#if values.multiple}
                    <Select.Root
                        type="multiple"
                        bind:value={playgroundPriorities}
                        disabled={values.disabled}
                    >
                        {@render parts()}
                    </Select.Root>
                {:else}
                    <Select.Root bind:value={playgroundPriority} disabled={values.disabled}>
                        {@render parts()}
                    </Select.Root>
                {/if}
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add select" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            <InlineText
                text={"Single selection is the default and binds a string. `Select.Value` shows the selected label, or its `placeholder` while nothing is chosen; Trigger renders it when you pass no children. Bind `value` or use `onValueChange` on Root to react to both pointer and keyboard selection; an item `onclick` handler only sees native clicks."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text>
            <InlineText
                text={"Set `type=\"multiple\"` to bind a string array; selecting an item toggles it without closing the menu, and `Select.Value` joins the selected labels. Use `name` to include the selection in a form; multiple values share the field name and can be read with `FormData.getAll()`. Root also accepts `disabled` and `required`."}
            />
        </Typography.Text>
        <Typography.Text>
            Arrow keys, Home, End, and typing move between options; disabled items are skipped.
            Before an option has mounted, a preselected value shows as its value string.
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="multiple" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Multiple selection</Typography.H3>
            <Typography.Text variant="supporting">
                Select several teams, clear the selection, or submit the named values. Disabled
                options stay unavailable.
            </Typography.Text>
            <ComponentPreview code={MultipleSrc}>
                <Multiple />
            </ComponentPreview>
        </div>

        <div id="scrollable" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Scrollable</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"A `max-h-*` class on Content caps the menu height; long lists scroll inside it."}
                />
            </Typography.Text>
            <ComponentPreview code={ScrollableSrc}>
                <Scrollable />
            </ComponentPreview>
        </div>

        <div id="dynamic-width" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Dynamic width</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"With `dynamic` on Content, the menu sizes to its longest option, even when the trigger is narrower."}
                />
            </Typography.Text>
            <ComponentPreview code={DynamicWidthSrc}>
                <DynamicWidth />
            </ComponentPreview>
        </div>

        <div id="glass" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Glass surface</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`surface=\"glass\"` on Content gives the menu a translucent, blurred background. Omit `surface` to inherit `--mielui-surface` from your theme, or set `surface=\"solid\"` to override it. Glass keeps an opaque fallback when backdrop filtering is unavailable and respects reduced-transparency preferences."}
                />
            </Typography.Text>
            <ComponentPreview code={GlassSrc}>
                <Glass />
            </ComponentPreview>
        </div>

        <div id="controlled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Controlled open state</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"Bind `open` on Root to open or close the list from your own code. `onOpenChange` reports when the person opens or closes it."}
                />
            </Typography.Text>
            <ComponentPreview code={ControlledExampleSrc}>
                <ControlledExample />
            </ComponentPreview>
        </div>
    </section>

    <section id="trigger-and-items" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Trigger and items</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Trigger needs a name. Pass `aria-label`, or point `aria-labelledby` at the id of a visible label so the label and the chosen value are read together. Trigger is a [Button](/docs/components/button) with a chevron: it takes `variant`, `size`, and `bind:element`, and `unstyled` removes the Button classes so `class` alone styles it. `onopen` runs just before the list opens. Its `onclick` runs first; call `preventDefault()` there to keep the list closed."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Item is a Button too, but it always uses the menu row style, so Button's `variant`, `size`, and `unstyled` do not apply. Pass `label` when the trigger should show different text than the option content. `loading` with `labels` shows progress on an option that starts slow work. An option is always a button and does not take `href`."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Content, Label, Item and Trigger accept `class`. Use `Select.Label` to head a group of options inside Content."}
            />
        </Typography.Text>
    </section>
</div>
