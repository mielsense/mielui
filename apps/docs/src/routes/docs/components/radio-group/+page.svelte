<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as RadioGroup from '@mielui/svelte/components/radio-group';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Descriptions from './examples/descriptions.svelte';
    import DescriptionsSrc from './examples/descriptions.svelte?raw';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import EventsExample from './examples/events.svelte';
    import EventsExampleSrc from './examples/events.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const installCommand = 'pnpm dlx @mielui/svelte add radio-group';
</script>

<svelte:head>
    <title>Mielui · Radio Group</title>
    <meta name="description" content="A group of mutually-exclusive options." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Radio Group">A group of radio buttons for selecting one option.</PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <RadioGroup.Root
                    value="pro"
                    name="plan"
                    aria-label="Plan"
                    disabled={values.disabled}
                >
                    <RadioGroup.Item
                        value="free"
                        label="Free"
                        description={values.descriptions ? 'For solo hobby projects.' : undefined}
                        aria-invalid={values.invalid ? 'true' : undefined}
                    />
                    <RadioGroup.Item
                        value="pro"
                        label="Pro"
                        description={values.descriptions
                            ? 'For small teams and side projects.'
                            : undefined}
                        aria-invalid={values.invalid ? 'true' : undefined}
                    />
                    <RadioGroup.Item
                        value="team"
                        label="Team"
                        description={values.descriptions
                            ? 'Audit log, SSO, and priority support.'
                            : undefined}
                        disabled={values.disabledItem}
                        aria-invalid={values.invalid ? 'true' : undefined}
                    />
                </RadioGroup.Root>
            {/snippet}
        </Playground>
    </section>

    <!-- ─── Installation ──────────────────────────────────────────── -->
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Each group owns its keyboard selection and generated item IDs. Set name when the
            selected value should be submitted with a form. Descriptions are linked to their inputs,
            and keyboard focus appears on the visible radio.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Import RadioGroup and compose it with Item sub-components:
        </Typography.Text>
        <CodeBlock
            code={`import * as RadioGroup from '@mielui/svelte/components/radio-group';\n\n<RadioGroup.Root bind:value name="plan" aria-label="Plan">\n  <RadioGroup.Item value="pro" label="Pro" />\n</RadioGroup.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <!-- With descriptions -->
        <div id="descriptions" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With descriptions</Typography.H3>
            <ComponentPreview code={DescriptionsSrc}>
                <Descriptions />
            </ComponentPreview>
        </div>

        <!-- Disabled -->
        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled</Typography.H3>
            <ComponentPreview code={DisabledSrc}>
                <Disabled />
            </ComponentPreview>
        </div>
    </section>
    <section id="events-and-naming" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Events and naming</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`onValueChange` on Root runs with the new value each time the choice changes, for when you want to react without binding `value`. Name the group with a `legend`, an `aria-label`, or `aria-labelledby` pointing at the id of a visible label."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Item takes its text through `label` and `description`. Put richer content in its `children` when a plain label is not enough, and Root renders the items you pass as its `children`."}
            />
        </Typography.Text>
        <ComponentPreview code={EventsExampleSrc}>
            <EventsExample />
        </ComponentPreview>
    </section>
</div>
