<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Example from './example.svelte';
    import Source from './example.svelte?raw';
    import Formatted from './formatted.svelte';
    import FormattedSource from './formatted.svelte?raw';
</script>

<svelte:head><title>Mielui · Number shuffle</title></svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Number shuffle">Roll digits as a numeric value changes.</PageIntro>
    <ComponentPreview code={Source}><Example /></ComponentPreview>
    <section class="flex flex-col gap-4">
        <Typography.H2>Usage</Typography.H2>
        <Typography.Text>
            Import numberShuffle from @mielui/svelte/actions/number-shuffle. Attach it to a
            text-only element and pass value. Render the final value as its text so it is available
            before JavaScript loads. Use tabular numerals and reserve enough width for the expected
            values.
        </Typography.Text>
        <CodeBlock code={Source} lang="svelte" />
    </section>
    <section class="flex flex-col gap-4">
        <Typography.H2>Formatted values</Typography.H2>
        <Typography.Text>
            Pass format to display decimals, separators, or units. Use the same formatter for the
            element's text. Keep icons and other markup outside the animated element.
        </Typography.Text>
        <ComponentPreview code={FormattedSource}><Formatted /></ComponentPreview>
    </section>
    <section class="flex flex-col gap-4">
        <Typography.H2>Motion and accessibility</Typography.H2>
        <Typography.Text>
            Entry starts at zero. Updates continue from the current value when interrupted. The
            visual digits are hidden from assistive technology, which reads the final text. Reduced
            motion and disabled theme motion show the final value immediately. Removing the element
            cleans up the animation.
        </Typography.Text>
    </section>
    <section id="api-reference" class="flex flex-col gap-4">
        <Typography.H2>API reference</Typography.H2>
        <Typography.H3>numberShuffle</Typography.H3>
        <Typography.Text>
            A Svelte action for a text-only HTMLElement. Pass a NumberShuffleOptions object.
        </Typography.Text>
        <Typography.H3>value</Typography.H3>
        <Typography.Text>Required number. The target value to display.</Typography.Text>
        <Typography.H3>format</Typography.H3>
        <Typography.Text>
            Optional (value: number) =&gt; string formatter. Defaults to String.
        </Typography.Text>
        <Typography.H3>duration</Typography.H3>
        <Typography.Text>
            Optional duration in milliseconds. Defaults to twice the theme panel duration, with a
            480ms fallback. Set zero to update immediately.
        </Typography.Text>
    </section>
</div>
