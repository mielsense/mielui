<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview } from '$lib/components/docs';
    import Example from './example.svelte';
    import Source from './example.svelte?raw';
    import TextExample from './text-example.svelte';
    import TextSource from './text-example.svelte?raw';
</script>

<svelte:head><title>Mielui · Shimmer</title></svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <header>
        <Typography.H1>Shimmer</Typography.H1>
        <Typography.Text variant="lead" class="mt-2">
            Sweep a highlight across loading text or a placeholder.
        </Typography.Text>
    </header>
    <ComponentPreview code={Source}><Example /></ComponentPreview>
    <section class="flex flex-col gap-4">
        <Typography.H2>Usage</Typography.H2>
        <Typography.Text>
            Import shimmer from @mielui/svelte/actions/shimmer and add use:shimmer to a container.
            The action takes no options. It clips the highlight to the container's rounded corners
            without moving its content.
        </Typography.Text>
        <CodeBlock code={Source} lang="svelte" />
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
</div>
