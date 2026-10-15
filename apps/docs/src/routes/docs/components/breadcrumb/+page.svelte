<script lang="ts">
    import { Home01Icon as Home } from '@hugeicons/core-free-icons';
    import * as Breadcrumb from '@mielui/svelte/components/breadcrumb';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Separators from './examples/separators.svelte';
    import SeparatorsSrc from './examples/separators.svelte?raw';
    import WithIcon from './examples/with-icon.svelte';
    import WithIconSrc from './examples/with-icon.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        pages as playgroundPages
    } from './playground';

    const usage = `<script lang="ts">
    import * as Breadcrumb from '@mielui/svelte/components/breadcrumb';
</${'script'}>

<Breadcrumb.Root>
    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item current>Settings</Breadcrumb.Item>
</Breadcrumb.Root>`;
</script>

<svelte:head>
    <title>Mielui · Breadcrumb</title>
    <meta
        name="description"
        content="A trail of links showing the user's position in a hierarchy."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Breadcrumb">
        A trail of links showing the current position in a hierarchy.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {const pages = $derived(playgroundPages(values.items))}
                <Breadcrumb.Root>
                    {#each pages as page, index (page.href)}
                        {const current = $derived(index === pages.length - 1 && values.current)}
                        {const href = $derived(current ? undefined : page.href)}
                        {#if index > 0}
                            {#if values.separator === 'slash'}
                                <Breadcrumb.Separator>/</Breadcrumb.Separator>
                            {:else}
                                <Breadcrumb.Separator />
                            {/if}
                        {/if}
                        {#if index === 0 && values.homeIcon}
                            <Breadcrumb.Item {href} {current} aria-label={page.label}>
                                <HugeiconsIcon icon={Home} size={13} />
                            </Breadcrumb.Item>
                        {:else}
                            <Breadcrumb.Item {href} {current}>{page.label}</Breadcrumb.Item>
                        {/if}
                    {/each}
                </Breadcrumb.Root>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add breadcrumb" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Breadcrumb is router independent. Set `current` on the item for the active page; it sets both the styling and `aria-current=\"page\"`. The current item can omit `href`."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root is a navigation landmark named \"Breadcrumb\". Pass `aria-label` to translate or change that name. Separators are hidden from assistive technology."}
            />
        </Typography.Text>
        <CodeBlock code={usage} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="separators" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Separator styles</Typography.H3>
            <ComponentPreview code={SeparatorsSrc}>
                <Separators />
            </ComponentPreview>
        </div>

        <div id="with-icon" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With home icon</Typography.H3>
            <ComponentPreview code={WithIconSrc}>
                <WithIcon />
            </ComponentPreview>
        </div>
    </section>
    <section id="parts" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Separator draws a chevron by default. Put your own character or icon in its `children` to change it."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Every part renders its `children` and takes `class`. Root passes nav attributes such as `aria-label`, and Item passes anchor attributes such as `target`."}
            />
        </Typography.Text>
    </section>
</div>
