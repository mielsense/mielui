<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
    import { resolve } from '$app/paths';
    import { inlineLinkClass } from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';

    const actions = [
        {
            label: 'Morph',
            href: resolve('/docs/actions/morph'),
            description: 'Animate SVG geometry and text when a displayed value changes.'
        },
        {
            label: 'Number shuffle',
            href: resolve('/docs/actions/number-shuffle'),
            description: 'Roll digits when a count, total, or percentage changes.'
        },
        {
            label: 'Shimmer',
            href: resolve('/docs/actions/shimmer'),
            description: 'Sweep a loading highlight across text or a placeholder.'
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
        <dl class="m-0 grid gap-x-8 gap-y-3 text-base leading-relaxed sm:grid-cols-[auto_1fr]">
            {#each actions as action (action.href)}
                <div class="grid gap-y-0.5 sm:col-span-2 sm:grid-cols-subgrid">
                    <dt class="font-medium">
                        <a class={inlineLinkClass} href={action.href}>{action.label}</a>
                    </dt>
                    <dd class="m-0 text-foreground-muted">{action.description}</dd>
                </div>
            {/each}
        </dl>
    </section>
</div>
