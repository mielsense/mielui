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

    const TITLE = 'Breadcrumb';
    const SLUG = 'breadcrumb';

    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta
        name="description"
        content="A trail of links showing the user's position in a hierarchy."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title={TITLE}>
        A trail of links showing the current position in a hierarchy.
    </PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {@const pages = playgroundPages(values.items)}
                <Breadcrumb.Root aria-label={values.label || undefined}>
                    {#each pages as page, index (page.href)}
                        {@const current = index === pages.length - 1 && values.current}
                        {@const href = current && !values.currentLink ? undefined : page.href}
                        {#if index > 0}
                            {#if values.slash}
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

    <!-- ─── Installation ──────────────────────────────────────────── -->
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Breadcrumb is router independent. Set current on the item representing the active page;
            it controls both styling and aria-current="page". The final item may omit href. Root
            accepts native navigation attributes, including aria-label for a translated or distinct
            navigation name.
        </Typography.Text>
        <Typography.Text variant="supporting">
            The root is a labeled navigation landmark, and separators are decorative.
        </Typography.Text>

        <CodeBlock
            code={`import * as Breadcrumb from '@mielui/svelte/components/breadcrumb';\n\n<Breadcrumb.Root>\n  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>\n  <Breadcrumb.Separator>/</Breadcrumb.Separator>\n  <Breadcrumb.Item current>Current</Breadcrumb.Item>\n</Breadcrumb.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <!-- Separator styles -->
        <div id="separators" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Separator styles</Typography.H3>
            <ComponentPreview code={SeparatorsSrc}>
                <Separators />
            </ComponentPreview>
        </div>

        <!-- With home icon -->
        <div id="with-icon" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With home icon</Typography.H3>
            <ComponentPreview code={WithIconSrc}>
                <WithIcon />
            </ComponentPreview>
        </div>
    </section>
    <section id="parts" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Separator draws a chevron by default. Put your own character or icon in its `children` to change it."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Item and Separator render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>
</div>
