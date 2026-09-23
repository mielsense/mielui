<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { resolve } from '$app/paths';
    import PageIntro from '$lib/components/docs/page-intro.svelte';

    const packageQuick = `pnpm add @mielui/svelte
# then in your CSS:
# @import '@mielui/svelte/ui.css';`;

    const cliQuick = `pnpm dlx @mielui/svelte init -y
pnpm dlx @mielui/svelte add button`;
</script>

<svelte:head>
    <title>Mielui · Introduction</title>
    <meta name="description" content="mielui is a Svelte 5 and Tailwind v4 component library." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-16">
    <PageIntro title="Introduction">
        mielui is a component library for Svelte 5 and Tailwind v4. It includes components, theme
        tokens, and a CLI for copying source into your project.
    </PageIntro>

    <section id="two-ways" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Two ways to use it</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <strong>Package import.</strong>
            Install
            <Typography.InlineCode>@mielui/svelte</Typography.InlineCode>
            and import components from the package. Update the dependency to receive new releases.
        </Typography.Text>
        <Typography.Text variant="body" class="m-0">
            <strong>CLI source copy.</strong>
            Run the
            <Typography.InlineCode>mielui</Typography.InlineCode>
            CLI to copy component files into your repo. Edit the copied files directly when you need
            custom behavior.
        </Typography.Text>
    </section>

    <section id="requirements" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Requirements</Typography.H2>
        <ul
            class="m-0 flex list-disc flex-col gap-1.5 pl-5 text-[1rem] text-foreground leading-relaxed"
        >
            <li>Svelte 5.56 or newer, with or without SvelteKit</li>
            <li>Tailwind CSS v4</li>
        </ul>
        <Typography.Text variant="body" class="m-0">
            Use pnpm, npm, or Yarn to install the library. This repository uses pnpm and Node.js.
        </Typography.Text>
    </section>

    <section id="quick-start" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Quick start</Typography.H2>
        <Typography.Text variant="body" class="m-0">Package path:</Typography.Text>
        <CodeBlock code={packageQuick} lang="shell" copy="overlay" />
        <Typography.Text variant="body" class="m-0">CLI path:</Typography.Text>
        <CodeBlock code={cliQuick} lang="shell" copy="overlay" />
    </section>

    <section id="next" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Next</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <a
                class="text-foreground underline underline-offset-2"
                href={resolve('/docs/installation')}
            >
                Installation
            </a>
            ·
            <a class="text-foreground underline underline-offset-2" href={resolve('/docs/theming')}>
                Theming
            </a>
            ·
            <a
                class="text-foreground underline underline-offset-2"
                href={resolve('/docs/components')}
            >
                Components
            </a>
        </Typography.Text>
    </section>
</div>
