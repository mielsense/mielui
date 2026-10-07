<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
    import { resolve } from '$app/paths';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Rows from '$lib/components/docs/rows.svelte';

    const actions = [
        {
            label: 'Morph',
            href: resolve('/docs/actions/morph'),
            value: 'Animate SVG geometry and text when a displayed value changes.'
        },
        {
            label: 'Number shuffle',
            href: resolve('/docs/actions/number-shuffle'),
            value: 'Roll digits when a count, total, or percentage changes.'
        },
        {
            label: 'Shimmer',
            href: resolve('/docs/actions/shimmer'),
            value: 'Sweep a loading highlight across text or a placeholder.'
        }
    ];
</script>

<svelte:head>
    <title>Mielui · Actions</title>
    <meta
        name="description"
        content="Svelte actions that add motion to existing elements without replacing them."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-16">
    <PageIntro title="Actions">Add animation to existing elements with Svelte actions.</PageIntro>

    <section id="available-actions" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Available actions</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Actions attach to an element you already render. They respect reduced motion and the
            theme's motion settings, and they clean up when the element unmounts.
        </Typography.Text>
        <Rows items={actions} label="Available actions" />
    </section>
</div>
