<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Form from './examples/form.svelte';
    import FormSource from './examples/form.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSource from './examples/hero.svelte?raw';
    import Multiple from './examples/multiple.svelte';
    import MultipleSource from './examples/multiple.svelte?raw';

    import usage from './examples/usage.svelte?raw';
</script>

<svelte:head>
    <title>Mielui · Native Select</title>
    <meta
        name="description"
        content="A select field that uses your browser and operating system's option picker."
    />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Native Select">
        A select field that uses your browser and operating system's option picker.
    </PageIntro>

    <ComponentPreview code={HeroSource}><Hero /></ComponentPreview>
    <section id="installation" class="flex flex-col gap-4">
        <Typography.H2>Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add native-select" />
    </section>
    <section id="usage" class="flex flex-col gap-4">
        <Typography.H2>Usage</Typography.H2>
        <CodeBlock copy="overlay" code={usage} lang="svelte" />
        <Typography.Text>
            <Typography.InlineCode>Root</Typography.InlineCode> renders a native select. Bind a
            string for single selection, or a string array with<Typography.InlineCode>
                multiple
            </Typography.InlineCode>
            . Option values are strings. Use<Typography.InlineCode>
                OptGroup
            </Typography.InlineCode> with a<Typography.InlineCode>label</Typography.InlineCode> to
            group options.
        </Typography.Text>
        <Typography.Text>
            Associate<Typography.InlineCode>Label</Typography.InlineCode> with the select using
            matching<Typography.InlineCode>for</Typography.InlineCode> and<Typography.InlineCode>
                id
            </Typography.InlineCode> values, or provide<Typography.InlineCode>
                aria-label
            </Typography.InlineCode>
            . Native form attributes and change events pass through. The<Typography.InlineCode>
                size
            </Typography.InlineCode> attribute controls the number of visible rows.
        </Typography.Text>
        <Typography.Text>
            The browser handles validation, keyboard selection, and the mobile picker. Use Select
            when you need a custom popup.
        </Typography.Text>
    </section>
    <section class="flex flex-col gap-4">
        <Typography.H2>Multiple selection</Typography.H2>
        <ComponentPreview code={MultipleSource}><Multiple /></ComponentPreview>
    </section>
    <section class="flex flex-col gap-4">
        <Typography.H2>Required field</Typography.H2>
        <ComponentPreview code={FormSource}><Form /></ComponentPreview>
    </section>
</div>
