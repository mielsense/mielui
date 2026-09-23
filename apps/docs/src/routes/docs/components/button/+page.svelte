<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import AsLink from './examples/as-link.svelte';
    import AsLinkSrc from './examples/as-link.svelte?raw';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import IconGroup from './examples/icon-group.svelte';
    import IconGroupSrc from './examples/icon-group.svelte?raw';
    import LeadingIcon from './examples/leading-icon.svelte';
    import LeadingIconSrc from './examples/leading-icon.svelte?raw';
    import Loading from './examples/loading.svelte';
    import LoadingSrc from './examples/loading.svelte?raw';
    import Sizes from './examples/sizes.svelte';
    import SizesSrc from './examples/sizes.svelte?raw';
    import TrailingIcon from './examples/trailing-icon.svelte';
    import TrailingIconSrc from './examples/trailing-icon.svelte?raw';

    import Variants from './examples/variants.svelte';
    import VariantsSrc from './examples/variants.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add button';
</script>

<svelte:head>
    <title>Mielui · Button</title>
    <meta
        name="description"
        content="Displays an action or link with stable loading, success, and error states."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Button">
        A clickable action in several variants and sizes. Pick a variant for what the action means.
    </PageIntro>
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}>
            <Hero />
        </ComponentPreview>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Set{' '}
            <Typography.InlineCode>href</Typography.InlineCode> to render a link, including an empty
            href. Without it, Button renders a native button.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Disabled links have no navigation destination and are skipped by Tab.
            <Typography.InlineCode>aria-disabled</Typography.InlineCode> also blocks activation.
            Loading controls remain focusable but cannot activate.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Use{' '}
            <Typography.InlineCode>status</Typography.InlineCode> for loading, success, and error
            feedback. Changing status keeps the button width stable.
        </Typography.Text>
        <CodeBlock
            code={`import { Button } from '$lib/mielui/components/button';

let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');

<Button {status} loadingLabel="Publishing…" successLabel="Published">
  Publish
</Button>`}
            lang="svelte"
            copy="overlay"
        />
    </section>
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>
        <div id="variants" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Variants</Typography.H3>
            <ComponentPreview code={VariantsSrc}><Variants /></ComponentPreview>
        </div>
        <div id="sizes" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Sizes</Typography.H3>
            <ComponentPreview code={SizesSrc}>
                <Sizes />
            </ComponentPreview>
        </div>
        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled</Typography.H3>
            <ComponentPreview code={DisabledSrc}>
                <Disabled />
            </ComponentPreview>
        </div>
        <div id="comp-leading" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Leading icon</Typography.H3>
            <ComponentPreview code={LeadingIconSrc}>
                <LeadingIcon />
            </ComponentPreview>
        </div>
        <div id="comp-trailing" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Trailing icon</Typography.H3>
            <ComponentPreview code={TrailingIconSrc}>
                <TrailingIcon />
            </ComponentPreview>
        </div>
        <div id="comp-loading" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">
                Loading, success, and retry
            </Typography.H3>
            <ComponentPreview code={LoadingSrc}>
                <Loading />
            </ComponentPreview>
        </div>
        <div id="comp-link" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">As link</Typography.H3>
            <ComponentPreview code={AsLinkSrc}>
                <AsLink />
            </ComponentPreview>
        </div>
        <div id="comp-group" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Icon group</Typography.H3>
            <ComponentPreview code={IconGroupSrc}>
                <IconGroup />
            </ComponentPreview>
        </div>
    </section>
</div>
