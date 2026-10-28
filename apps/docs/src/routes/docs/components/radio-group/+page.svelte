<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as RadioGroup from '@mielui/svelte/components/radio-group';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import Descriptions from './examples/descriptions.svelte';
    import DescriptionsSrc from './examples/descriptions.svelte?raw';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import EventsExample from './examples/events.svelte';
    import EventsExampleSrc from './examples/events.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        options as playgroundOptions
    } from './playground';

    let playgroundPlan = $state('pro');

    const usageCode = `<script lang="ts">
    import * as RadioGroup from '@mielui/svelte/components/radio-group';

    let plan = $state('pro');
</${'script'}>

<RadioGroup.Root bind:value={plan} name="plan" aria-label="Plan">
    <RadioGroup.Item value="free" label="Free" />
    <RadioGroup.Item value="pro" label="Pro" />
</RadioGroup.Root>`;
</script>

<svelte:head>
    <title>Mielui · Radio Group</title>
    <meta name="description" content="A group of mutually exclusive options." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Radio Group">A group of radio buttons for selecting one option.</PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <RadioGroup.Root
                    bind:value={playgroundPlan}
                    name="plan"
                    aria-label="Plan"
                    disabled={values.disabled}
                >
                    {#each playgroundOptions as option (option.value)}
                        <RadioGroup.Item
                            value={option.value}
                            label={option.label}
                            description={values.descriptions ? option.description : undefined}
                            disabled={values.disabledItem && option.value === 'team'}
                            aria-invalid={values.invalid ? 'true' : undefined}
                        />
                    {/each}
                </RadioGroup.Root>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add radio-group" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            <InlineText
                text={"Bind `value` on Root and add one `RadioGroup.Item` per option. Each group owns its keyboard selection and generated item ids. Set `name` when the selected value should be submitted with a form. Descriptions are linked to their inputs, and keyboard focus appears on the visible radio."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="descriptions" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With descriptions</Typography.H3>
            <ComponentPreview code={DescriptionsSrc}>
                <Descriptions />
            </ComponentPreview>
        </div>

        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled</Typography.H3>
            <ComponentPreview code={DisabledSrc}>
                <Disabled />
            </ComponentPreview>
        </div>

        <div id="change-events" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Change events</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`onValueChange` reports each new choice without binding `value`. The group is named by a visible label through `aria-labelledby`."}
                />
            </Typography.Text>
            <ComponentPreview code={EventsExampleSrc}>
                <EventsExample />
            </ComponentPreview>
        </div>
    </section>

    <section id="events-and-naming" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Events and naming</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`onValueChange` on Root runs with the new value each time the choice changes. Name the group with a `legend`, an `aria-label`, or `aria-labelledby` pointing at the id of a visible label."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Item takes its text through `label` and `description`. Root renders the items you pass as its `children`. Resetting the form restores the initial value."}
            />
        </Typography.Text>
    </section>
</div>
