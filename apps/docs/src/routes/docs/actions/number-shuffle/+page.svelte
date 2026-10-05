<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import PropTable from '$lib/components/docs/prop-table.svelte';
    import type { ReferenceProperty } from '$lib/server/api-reference';
    import Example from './example.svelte';
    import Source from './example.svelte?raw';
    import Formatted from './formatted.svelte';
    import FormattedSource from './formatted.svelte?raw';

    const options: ReferenceProperty[] = [
        {
            name: 'value',
            type: 'number',
            required: true,
            bindable: false,
            default: null,
            description: 'The target value to display.',
            inherited: false
        },
        {
            name: 'format',
            type: '((value: number) => string) | undefined',
            required: false,
            bindable: false,
            default: 'String',
            description: 'Formats each intermediate and final value.',
            inherited: false
        },
        {
            name: 'duration',
            type: 'number | undefined',
            required: false,
            bindable: false,
            default: null,
            description:
                'Milliseconds. Defaults to twice the theme panel duration, with a 480ms fallback. Set zero to update immediately.',
            inherited: false
        }
    ];
</script>

<svelte:head>
    <title>Mielui · Number shuffle</title>
    <meta
        name="description"
        content="A Svelte action that rolls digits as a numeric value changes."
    />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Number shuffle">Roll digits as a numeric value changes.</PageIntro>
    <section id="hero" class="flex scroll-mt-20 flex-col gap-4">
        <ComponentPreview code={Source}><Example /></ComponentPreview>
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            <InlineText
                text="Import `numberShuffle` from `@mielui/svelte/actions/number-shuffle`. Attach it to a text-only element and pass `value`. Render the final value as its text so it is available before JavaScript loads. Use tabular numerals and reserve enough width for the expected values."
            />
        </Typography.Text>
        <CodeBlock code={Source} lang="svelte" copy="overlay" />
    </section>
    <section id="formatted-values" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Formatted values</Typography.H2>
        <Typography.Text>
            <InlineText
                text="Pass `format` to display decimals, separators, or units. Use the same formatter for the element's text. Keep icons and other markup outside the animated element."
            />
        </Typography.Text>
        <ComponentPreview code={FormattedSource}><Formatted /></ComponentPreview>
    </section>
    <section id="motion-and-accessibility" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Motion and accessibility</Typography.H2>
        <Typography.Text>
            Entry starts at zero. Updates continue from the current value when interrupted. The
            visual digits are hidden from assistive technology, which reads the final text. Reduced
            motion and disabled theme motion show the final value immediately. Removing the element
            cleans up the animation.
        </Typography.Text>
    </section>
    <section id="api-reference" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">API reference</Typography.H2>
        <Typography.Text>
            <InlineText
                text="`numberShuffle` is a Svelte action for a text-only `HTMLElement`. Pass a `NumberShuffleOptions` object."
            />
        </Typography.Text>
        <PropTable properties={options} />
    </section>
</div>
