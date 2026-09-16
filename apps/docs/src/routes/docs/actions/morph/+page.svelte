<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview } from '$lib/components/docs';
    import Example from './example.svelte';
    import Source from './example.svelte?raw';
</script>
<svelte:head><title>Mielui · Morph</title></svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <header>
        <Typography.H1>Morph</Typography.H1>
        <Typography.Text variant="lead" class="mt-2">
            Animate an icon or text when its value changes.
        </Typography.Text>
    </header>
    <ComponentPreview code={Source}><Example /></ComponentPreview>
    <section class="flex flex-col gap-4">
        <Typography.H2>Usage</Typography.H2>
        <Typography.Text>
            Import morph from @mielui/svelte/actions/morph and attach it to a visual wrapper. Change
            key with the displayed value. Duration defaults to 220 milliseconds.
        </Typography.Text>
        <CodeBlock code={Source} lang="svelte" />
    </section>
    <section class="flex flex-col gap-4">
        <Typography.H2>SVG and text</Typography.H2>
        <Typography.Text>
            Matching closed SVG shapes interpolate their geometry. Different icon structures use the
            same fixed-cell rotation, scale, and crossfade as Copy Button. Text changes use a short
            blur and crossfade.
        </Typography.Text>
    </section>
    <section class="flex flex-col gap-4">
        <Typography.H2>Composition and accessibility</Typography.H2>
        <Typography.Text>
            Use a span inside your existing button, not the button itself. Keep the button's
            accessible label outside the animation. The visual copy is hidden from assistive
            technology and cannot receive input. Give text a stable width if surrounding controls
            should not move.
        </Typography.Text>
        <Typography.Text>
            Reduced-motion preferences skip the animation. The visual layer stays inside its wrapper
            during scrolling and resizing. Interrupted transitions continue from the current visual
            state, and unmount restores the original content.
        </Typography.Text>
    </section>
</div>
