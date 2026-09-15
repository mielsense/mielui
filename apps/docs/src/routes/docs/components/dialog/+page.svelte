<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Basic from './examples/basic.svelte';
    import BasicSrc from './examples/basic.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Nested from './examples/nested.svelte';
    import NestedSrc from './examples/nested.svelte?raw';
    import Compact from './examples/size-compact.svelte';
    import CompactSrc from './examples/size-compact.svelte?raw';
    import Large from './examples/size-large.svelte';
    import LargeSrc from './examples/size-large.svelte?raw';
    import Wide from './examples/size-wide.svelte';
    import WideSrc from './examples/size-wide.svelte?raw';
    import WithSelect from './examples/with-select.svelte';
    import WithSelectSrc from './examples/with-select.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add dialog';
</script>

<svelte:head>
    <title>Mielui · Dialog</title>
    <meta name="description" content="A dialog for focused tasks, forms, and details." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1> Dialog </Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                Show a focused task, form, or details above the current page.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}>
            <Hero />
        </ComponentPreview>
    </section>

    <!-- ─── Installation ──────────────────────────────────────────── -->
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading"> Installation </Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading"> Usage </Typography.H2>
        <Typography.Text variant="supporting">
            Import Dialog and use it in your component:
        </Typography.Text>
        <CodeBlock
            code={`import * as Dialog from '$lib/mielui/components/dialog';\nimport Kbd from '$lib/mielui/components/kbd';\n\n<Dialog.Root open={isOpen} orientation="horizontal">\n  <Dialog.Trigger>Open</Dialog.Trigger>\n  <Dialog.Content>\n    <Dialog.Header>\n      <Dialog.Title>Title</Dialog.Title>\n    </Dialog.Header>\n    <Dialog.Footer>\n      <Dialog.Close>Cancel <Kbd shortcut="esc" /></Dialog.Close>\n      <Dialog.Confirm>Save <Kbd shortcut="enter" /></Dialog.Confirm>\n    </Dialog.Footer>\n  </Dialog.Content>\n</Dialog.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading"> Examples </Typography.H2>
            <Typography.Text variant="supporting" class="mt-2">
                Dialog with various structures.
            </Typography.Text>
        </div>

        <div id="basic" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading"> Basic </Typography.H3>
            <ComponentPreview code={BasicSrc}>
                <Basic />
            </ComponentPreview>
        </div>

        <div id="nested" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading"> Nested </Typography.H3>
            <ComponentPreview code={NestedSrc}>
                <Nested />
            </ComponentPreview>
        </div>

        <div id="with-select" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading"> With select </Typography.H3>
            <Typography.Text variant="supporting">
                A Select inside a dialog keeps its own layer: Escape closes the menu first and only
                then the dialog.
            </Typography.Text>
            <ComponentPreview code={WithSelectSrc}>
                <WithSelect />
            </ComponentPreview>
        </div>

        <div id="size-compact" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading"> Compact </Typography.H3>
            <ComponentPreview code={CompactSrc}>
                <Compact />
            </ComponentPreview>
        </div>

        <div id="size-large" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading"> Large </Typography.H3>
            <ComponentPreview code={LargeSrc}>
                <Large />
            </ComponentPreview>
        </div>

        <div id="size-wide" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading"> Wide </Typography.H3>
            <ComponentPreview code={WideSrc}>
                <Wide />
            </ComponentPreview>
        </div>
    </section>
</div>
