<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';

    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Pace from './examples/pace.svelte';
    import PaceSrc from './examples/pace.svelte?raw';
    import ReadyState from './examples/ready-state.svelte';
    import ReadyStateSrc from './examples/ready-state.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add spinner';
</script>

<svelte:head>
    <title>Mielui · Spinner</title>
    <meta name="description" content="An animated loading indicator for indeterminate work." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Spinner">
        A rotating loading indicator that can transition to a completion checkmark.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Success and exit feedback use the shared motion duration for opacity, scale, and
            rotation. Reduced motion removes transitions and continuous rotation.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Use Spinner for work with an unknown duration. Set
            <Typography.InlineCode>aria-hidden</Typography.InlineCode>
            when adjacent text already describes the loading state. Set
            <Typography.InlineCode>ready</Typography.InlineCode>
            when work completes to resolve it into a checkmark, then blur and collapse it away.
        </Typography.Text>
        <CodeBlock
            code={`import { Spinner } from '@mielui/svelte/components/spinner';\n\n<Spinner ready={saved} aria-hidden="true" />`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <section id="pace" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Speed and curved rotation</Typography.H2>
        <Typography.Text variant="supporting">
            Pass{' '}
            <Typography.InlineCode>speed</Typography.InlineCode> to scale the rotation pace, or
            <Typography.InlineCode>curved</Typography.InlineCode>
            for a varying-speed rotation that never stalls. The default stays a continuous spin.
        </Typography.Text>
        <ComponentPreview code={PaceSrc}><Pace /></ComponentPreview>
    </section>

    <section id="ready-state" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Completion state</Typography.H2>
        <Typography.Text variant="supporting">
            Pass{' '}
            <Typography.InlineCode>ready</Typography.InlineCode> after a successful operation. The
            spinner resolves to a checkmark, holds it for two seconds, then blurs and collapses
            without requiring parent state to unmount it.
        </Typography.Text>
        <ComponentPreview code={ReadyStateSrc}><ReadyState /></ComponentPreview>
    </section>
</div>
