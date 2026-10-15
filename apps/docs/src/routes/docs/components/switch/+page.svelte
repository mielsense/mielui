<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Basic from './examples/basic.svelte';
    import BasicSrc from './examples/basic.svelte?raw';
    import Description from './examples/description.svelte';
    import DescriptionSrc from './examples/description.svelte?raw';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usageCode = `<script lang="ts">
    import { Switch } from '@mielui/svelte/components/switch';

    let enabled = $state(false);
</${'script'}>

<Switch bind:checked={enabled} label="Notifications" />`;
</script>

<svelte:head>
    <title>Mielui · Switch</title>
    <meta name="description" content="On/off toggle for system-level settings." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Switch">A toggle for settings that apply immediately.</PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <Switch
                    checked={values.checked}
                    label={values.label ? 'Push notifications' : undefined}
                    aria-label={values.label ? undefined : 'Push notifications'}
                    description={values.description ? 'Sent when someone mentions you.' : undefined}
                    disabled={values.disabled}
                />
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add switch" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `checked` to read or set the state. `label` names the switch and toggles it when clicked, and `description` is announced with it. Without a visible label, pass `aria-label`. Set `name` and `value` to include the switch in a form submission while it is on."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `element` to reach the underlying button, for example to focus it."}
            />
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="basic" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Basic</Typography.H3>
            <ComponentPreview code={BasicSrc}>
                <Basic />
            </ComponentPreview>
        </div>

        <div id="description" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With description</Typography.H3>
            <ComponentPreview code={DescriptionSrc}>
                <Description />
            </ComponentPreview>
        </div>

        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled</Typography.H3>
            <ComponentPreview code={DisabledSrc}>
                <Disabled />
            </ComponentPreview>
        </div>
    </section>
</div>
