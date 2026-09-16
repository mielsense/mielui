<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
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
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>Native Select</Typography.H1>
            <Typography.Text variant="lead" class="mt-2">
                A select field that uses your browser and operating system's option picker.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>

    <ComponentPreview code={HeroSource}><Hero /></ComponentPreview>
    <section id="installation" class="flex flex-col gap-4">
        <Typography.H2>Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add native-select" />
    </section>
    <section id="usage" class="flex flex-col gap-4">
        <Typography.H2>Usage</Typography.H2>
        <CodeBlock code={usage} lang="svelte" />
        <Typography.Text>
            Root renders a native select. Bind a string for single selection or a string array with
            multiple. Option values are strings. OptGroup requires a label and can disable a group.
            Use Label with matching for and id, or provide aria-label. Native name, form, required,
            disabled, autocomplete, size, and change events pass through. The size attribute
            controls visible rows, not the visual control size. For a custom popup, use Select
            instead. Browser validation, form submission, keyboard interaction, RTL, and the mobile
            picker use native behavior.
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
