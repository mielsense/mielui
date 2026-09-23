<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Additional from './complete-example.svelte';
    import AdditionalSource from './complete-example.svelte?raw';
    import Example from './example.svelte';
    import Source from './example.svelte?raw';
    import TextExample from './text-example.svelte';
    import TextSource from './text-example.svelte?raw';
</script>

<svelte:head><title>Mielui · Shimmer</title></svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Shimmer">Sweep a highlight across loading text or a placeholder.</PageIntro>
    <ComponentPreview code={Source}><Example /></ComponentPreview>
    <section class="flex flex-col gap-4">
        <Typography.H2>Usage</Typography.H2>
        <Typography.Text>
            Import shimmer from @mielui/svelte/actions/shimmer and add use:shimmer to a container.
            The action takes no options. It clips the highlight to the container's rounded corners
            without moving its content.
        </Typography.Text>
        <CodeBlock copy="overlay" code={Source} lang="svelte" />
    </section>
    <section class="flex flex-col gap-4">
        <Typography.H2>Text</Typography.H2>
        <Typography.Text>
            On a plain-text element, the highlight moves through the letters. Keep the message short
            and use a status region for loading feedback.
        </Typography.Text>
        <ComponentPreview code={TextSource}><TextExample /></ComponentPreview>
    </section>
    <section class="flex flex-col gap-4">
        <Typography.H2>Skeleton</Typography.H2>
        <Typography.Text>
            Use variant="shimmer" on Skeleton for the same effect. The default variant stays still.
        </Typography.Text>
    </section>
    <section class="flex flex-col gap-4">
        <Typography.H2>Accessibility</Typography.H2>
        <Typography.Text>
            The highlight is hidden from assistive technology. Give the loading region an accessible
            label. Reduced motion removes the animation, including when the preference changes while
            the page is open. Unmounting removes the highlight and restores the container's
            positioning.
        </Typography.Text>
    </section>
    <section id="additional-example" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2>Finish loading</Typography.H2>
        <Typography.Text>
            Remove the action when the work finishes. Replace the pending message with a useful
            result instead of leaving an indefinite loading effect.
        </Typography.Text>
        <ComponentPreview code={AdditionalSource}><Additional /></ComponentPreview>
    </section>
    <section id="api-reference" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2>API reference</Typography.H2>
        <Typography.Text>
            shimmer attaches to an HTMLElement and accepts no options. Removing the element destroys
            the animation and restores its original positioning. Text-only nodes shimmer through
            their glyphs; containers receive a clipped highlight.
        </Typography.Text>
    </section>
</div>
