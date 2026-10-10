<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as NativeSelect from '@mielui/svelte/components/native-select';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Form from './examples/form.svelte';
    import FormSource from './examples/form.svelte?raw';
    import Multiple from './examples/multiple.svelte';
    import MultipleSource from './examples/multiple.svelte?raw';

    import usage from './examples/usage.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    let playgroundTimezone = $state('Europe/Paris');
    let playgroundTimezones = $state(['Europe/Paris']);
</script>

<svelte:head>
    <title>Mielui · Native Select</title>
    <meta
        name="description"
        content="A select field that uses your browser and operating system's option picker."
    />
</svelte:head>
{#snippet playgroundOptions(groups: boolean, disabledOption: boolean)}
    {#if groups}
        <NativeSelect.OptGroup label="Europe">
            <NativeSelect.Option value="Europe/Paris">Paris</NativeSelect.Option>
            <NativeSelect.Option value="Europe/London">London</NativeSelect.Option>
        </NativeSelect.OptGroup>
        <NativeSelect.OptGroup label="Americas">
            <NativeSelect.Option value="America/New_York">New York</NativeSelect.Option>
            <NativeSelect.Option value="America/Los_Angeles" disabled={disabledOption}>
                Los Angeles
            </NativeSelect.Option>
        </NativeSelect.OptGroup>
    {:else}
        <NativeSelect.Option value="Europe/Paris">Paris</NativeSelect.Option>
        <NativeSelect.Option value="Europe/London">London</NativeSelect.Option>
        <NativeSelect.Option value="America/New_York">New York</NativeSelect.Option>
        <NativeSelect.Option value="America/Los_Angeles" disabled={disabledOption}>
            Los Angeles
        </NativeSelect.Option>
    {/if}
{/snippet}

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Native Select">
        A select field that uses your browser and operating system's option picker.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <div class="w-full max-w-xs">
                    {#if values.multiple}
                        <NativeSelect.Root
                            multiple
                            bind:value={playgroundTimezones}
                            aria-label="Time zone"
                            size={values.size > 1 ? values.size : undefined}
                            disabled={values.disabled}
                            aria-invalid={values.invalid ? 'true' : undefined}
                        >
                            {@render playgroundOptions(values.groups, values.disabledOption)}
                        </NativeSelect.Root>
                    {:else}
                        <NativeSelect.Root
                            bind:value={playgroundTimezone}
                            aria-label="Time zone"
                            size={values.size > 1 ? values.size : undefined}
                            disabled={values.disabled}
                            aria-invalid={values.invalid ? 'true' : undefined}
                        >
                            {@render playgroundOptions(values.groups, values.disabledOption)}
                        </NativeSelect.Root>
                    {/if}
                </div>
            {/snippet}
        </Playground>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add native-select" />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <CodeBlock copy="overlay" code={usage} lang="svelte" />
        <Typography.Text>
            <Typography.InlineCode>Root</Typography.InlineCode>
            {' '}
            renders a native select. Bind a string for single selection, or a string array with{' '}
            <Typography.InlineCode>multiple</Typography.InlineCode>
            {' '}
            set. Option values are strings. Use{' '}
            <Typography.InlineCode>OptGroup</Typography.InlineCode>
            {' '}
            with a{' '}
            <Typography.InlineCode>label</Typography.InlineCode>
            {' '}
            to group options.
        </Typography.Text>
        <Typography.Text>
            Associate{' '}
            <Typography.InlineCode>Label</Typography.InlineCode>
            {' '}
            with the select using matching{' '}
            <Typography.InlineCode>for</Typography.InlineCode>
            {' '}
            and{' '}
            <Typography.InlineCode>id</Typography.InlineCode>
            {' '}
            values, or provide{' '}
            <Typography.InlineCode>aria-label</Typography.InlineCode>
            {' '}
            instead. Native form attributes and change events pass through. The{' '}
            <Typography.InlineCode>size</Typography.InlineCode>
            {' '}
            attribute controls the number of visible rows.
        </Typography.Text>
        <Typography.Text>
            The browser handles validation, keyboard selection, and the mobile picker. Use Select
            when you need a custom popup.
        </Typography.Text>
    </section>
    <section id="multiple" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Multiple selection</Typography.H2>
        <ComponentPreview code={MultipleSource}><Multiple /></ComponentPreview>
    </section>
    <section id="required" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Required field</Typography.H2>
        <ComponentPreview code={FormSource}><Form /></ComponentPreview>
    </section>
</div>
