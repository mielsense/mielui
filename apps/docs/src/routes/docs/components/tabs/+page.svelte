<script lang="ts">
    import {
        Activity01Icon as Activity,
        File01Icon as File,
        Home01Icon as Home
    } from '@hugeicons/core-free-icons';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import Manual from './examples/manual.svelte';
    import ManualSrc from './examples/manual.svelte?raw';
    import Panels from './examples/panels.svelte';
    import PanelsSrc from './examples/panels.svelte?raw';
    import VariantDefault from './examples/variant-default.svelte';
    import VariantDefaultSrc from './examples/variant-default.svelte?raw';
    import VariantGhost from './examples/variant-ghost.svelte';
    import VariantGhostSrc from './examples/variant-ghost.svelte?raw';
    import VariantSegmented from './examples/variant-segmented.svelte';
    import VariantSegmentedSrc from './examples/variant-segmented.svelte?raw';
    import Vertical from './examples/vertical.svelte';
    import VerticalSrc from './examples/vertical.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        panelClass as playgroundPanelClass
    } from './playground';

    let playgroundTab = $state('overview');

    const usageCode = `<script lang="ts">
    import * as Tabs from '@mielui/svelte/components/tabs';

    let tab = $state('account');
</${'script'}>

<Tabs.Root bind:value={tab}>
    <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="account">Account settings</Tabs.Content>
    <Tabs.Content value="password">Password settings</Tabs.Content>
</Tabs.Root>`;
</script>

<svelte:head>
    <title>Mielui · Tabs</title>
    <meta
        name="description"
        content="Switch between mutually-exclusive views with horizontal or vertical tabs and a sliding indicator."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Tabs">
        A horizontal or vertical switcher for views that share a context. Comes in three variants.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {const gap = $derived(values.icons ? 'gap-1.5' : undefined)}
                {const panelClass = $derived(playgroundPanelClass(values.orientation))}
                <div class={values.panels ? 'w-full max-w-sm' : 'contents'}>
                    <Tabs.Root
                        bind:value={playgroundTab}
                        variant={values.variant}
                        orientation={values.orientation}
                        activationMode={values.activationMode}
                    >
                        <Tabs.List>
                            <Tabs.Trigger value="overview" class={gap}>
                                {#if values.icons}
                                    <HugeiconsIcon icon={Home} size={14} />
                                {/if}
                                Overview
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="activity"
                                class={values.icons || values.count ? 'gap-1.5' : undefined}
                            >
                                {#if values.icons}
                                    <HugeiconsIcon icon={Activity} size={14} />
                                {/if}
                                Activity
                                {#if values.count}
                                    <span class="text-xs tabular-nums text-foreground-muted">
                                        12
                                    </span>
                                {/if}
                            </Tabs.Trigger>
                            <Tabs.Trigger value="files" disabled={values.disabled} class={gap}>
                                {#if values.icons}
                                    <HugeiconsIcon icon={File} size={14} />
                                {/if}
                                Files
                            </Tabs.Trigger>
                        </Tabs.List>
                        {#if values.panels}
                            <Tabs.Content value="overview" class={panelClass}>
                                Everything is up to date.
                            </Tabs.Content>
                            <Tabs.Content value="activity" class={panelClass}>
                                You updated the project settings.
                            </Tabs.Content>
                            <Tabs.Content value="files" class={panelClass}>
                                README.md and package.json
                            </Tabs.Content>
                        {/if}
                    </Tabs.Root>
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add tabs" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `value` on Root to the selected tab. Each Trigger's `value` matches the Content panel it shows. When `value` matches no enabled trigger, the first enabled trigger is selected and `onValueChange` reports it."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            <InlineText
                text={'Arrow keys move between tabs along the orientation and wrap at the ends. Home and End jump to the first and last enabled tab. Focusing a tab selects it unless `activationMode` is `manual`. Inactive panels unmount unless their Content sets `forceMount`. Give List an `aria-label` when nothing nearby names the tabs.'}
            />
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="panels" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Panels</Typography.H3>
            <Typography.Text variant="supporting">
                Each tab shows its own panel. A grid on List stretches the tabs to full width.
            </Typography.Text>
            <ComponentPreview code={PanelsSrc}>
                <Panels />
            </ComponentPreview>
        </div>

        <div id="default" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Default</Typography.H3>
            <ComponentPreview code={VariantDefaultSrc}>
                <VariantDefault />
            </ComponentPreview>
        </div>

        <div id="ghost" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Ghost</Typography.H3>
            <ComponentPreview code={VariantGhostSrc}>
                <VariantGhost />
            </ComponentPreview>
        </div>

        <div id="segmented" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Segmented</Typography.H3>
            <ComponentPreview code={VariantSegmentedSrc}>
                <VariantSegmented />
            </ComponentPreview>
        </div>

        <div id="vertical" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Vertical</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'`orientation="vertical"` stacks the tabs beside the panel. Up and Down Arrow move between them.'}
                />
            </Typography.Text>
            <ComponentPreview code={VerticalSrc}>
                <Vertical />
            </ComponentPreview>
        </div>

        <div id="manual-activation" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">
                Manual activation and kept state
            </Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'With `activationMode="manual"`, arrow keys move focus and Enter or Space selects. The Draft panel sets `forceMount`, so its input keeps its text while hidden. History is disabled.'}
                />
            </Typography.Text>
            <ComponentPreview code={ManualSrc}>
                <Manual />
            </ComponentPreview>
        </div>
    </section>
</div>
