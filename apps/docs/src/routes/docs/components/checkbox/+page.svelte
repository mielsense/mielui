<script lang="ts">
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Checked from './examples/checked.svelte';
    import CheckedSrc from './examples/checked.svelte?raw';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import EventsExample from './examples/events.svelte';
    import EventsExampleSrc from './examples/events.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import LabelOnly from './examples/label-only.svelte';
    import LabelOnlySrc from './examples/label-only.svelte?raw';
    import Sizes from './examples/sizes.svelte';
    import SizesSrc from './examples/sizes.svelte?raw';
    import WithDescription from './examples/with-description.svelte';
    import WithDescriptionSrc from './examples/with-description.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usage = `<script lang="ts">
    import { Checkbox } from '@mielui/svelte/components/checkbox';

    let checked = $state(false);
</${'script'}>

<Checkbox bind:checked label="Email me about product updates" />`;
</script>

<svelte:head>
    <title>Mielui · Checkbox</title>
    <meta name="description" content="A binary option presented as a labeled box." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Checkbox">
        A checkbox with a dash indicator, bindable checked state, optional label, and description.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <Checkbox
                    variant={values.variant}
                    size={values.size}
                    checked={values.checked}
                    label={values.label ? 'Product updates' : undefined}
                    aria-label={values.label ? undefined : 'Product updates'}
                    description={values.description
                        ? 'Get an email when a new version ships.'
                        : undefined}
                    disabled={values.disabled}
                    aria-invalid={values.invalid ? 'true' : undefined}
                />
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add checkbox" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Input attributes such as `name`, `value`, `required`, `form`, `id`, and `aria-describedby` reach the native checkbox. `label` names the checkbox and `description` is linked as its description. An explicit `aria-label` or `aria-labelledby` takes priority over `label`. Set `aria-invalid` to mark an unchecked box as invalid."}
            />
        </Typography.Text>
        <CodeBlock code={usage} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="launch-checklist" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Launch checklist</Typography.H3>
            <Typography.Text variant="supporting">
                A list of tasks with a count of the ones that are done.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="sizes" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Sizes</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`size` takes `sm`, `md`, or `lg` for a 14, 18, or 22px box. `md` is the default. The label stays clickable at every size."}
                />
            </Typography.Text>
            <ComponentPreview code={SizesSrc}><Sizes /></ComponentPreview>
        </div>

        <div id="label-only" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Label only</Typography.H3>
            <ComponentPreview code={LabelOnlySrc}>
                <LabelOnly />
            </ComponentPreview>
        </div>

        <div id="with-description" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With description</Typography.H3>
            <ComponentPreview code={WithDescriptionSrc}>
                <WithDescription />
            </ComponentPreview>
        </div>

        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled</Typography.H3>
            <ComponentPreview code={DisabledSrc}>
                <Disabled />
            </ComponentPreview>
        </div>

        <div id="checked" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Checked</Typography.H3>
            <ComponentPreview code={CheckedSrc}>
                <Checked />
            </ComponentPreview>
        </div>
    </section>
    <section id="events-and-variant" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Events and the card variant</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`onCheckedChange` runs with the new state each time the box is ticked or cleared, for when you want to react without binding `checked`. `variant=\"card\"` sets the checkbox in a card row whose edge strengthens when ticked, which helps a single important checkbox stand out."}
            />
        </Typography.Text>
        <ComponentPreview code={EventsExampleSrc}>
            <EventsExample />
        </ComponentPreview>
    </section>
</div>
