<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
</script>

<svelte:head>
    <title>Mielui · Fieldset</title>
    <meta
        name="description"
        content="Native form grouping with legends, descriptions, and disabled semantics."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Fieldset">
        Give related fields one clear name and a shared boundary.
    </PageIntro>
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add fieldset field input" />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Root is a native fieldset and Legend is its native legend. Keep Legend first so it names
            the group. Description is optional prose; give it an ID and pass that ID through Root’s
            aria-describedby when it explains the whole group.
        </Typography.Text>
        <CodeBlock code={HeroSrc} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            Use<a href="/docs/components/field" class="underline underline-offset-4">Field</a> for
            individual labels and errors. Use Field.Group when you need spacing without another
            named group. Native name, form, disabled, event handlers, attachments, and an element
            binding are forwarded by Root.
        </Typography.Text>
    </section>
    <section id="disabled" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Disable a group</Typography.H2>
        <Typography.Text variant="supporting">
            A disabled fieldset disables its native descendant controls and excludes their values
            from submission. Controls inside its first legend are exempt under native HTML rules.
            Keep an external “Edit” action outside the fieldset if it must remain available.
        </Typography.Text>
        <ComponentPreview code={DisabledSrc}><Disabled /></ComponentPreview>
    </section>
    <section id="composition" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Compose the group</Typography.H2>
        <Typography.Text variant="supporting">
            Legend and Description are independent parts. Omit Description for a self-explanatory
            group; keep Legend for a meaningful accessible name. Put grids and nested Field.Group
            parts inside Root to change the layout without changing the form’s submission behavior.
            The default uses spacing rather than a decorative card border.
        </Typography.Text>
    </section>
</div>
