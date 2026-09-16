<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
</script>
<svelte:head>
    <title>Mielui · Agent skill</title>
    <meta
        name="description"
        content="Give coding agents current Mielui APIs, composition patterns, and design guidance."
    />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <header>
        <Typography.H1>Agent skill</Typography.H1>
        <Typography.Text variant="lead" class="mt-2 max-w-2xl">
            Give your coding agent Mielui's component APIs, composition patterns, and design
            guidance.
        </Typography.Text>
    </header>
    <section class="flex flex-col gap-4">
        <Typography.H2>Install the skill</Typography.H2>
        <Typography.Text>
            Run this command from your project and select your coding agent in the installer.
        </Typography.Text>
        <CodeBlock code="npx skills add mielsense/mielui --skill mielui" lang="sh" />
        <Typography.Text>
            The skill is stored in the repository and loads current documentation when used. It
            checks the installed version before recommending an API.
        </Typography.Text>
    </section>
    <section class="flex flex-col gap-4">
        <Typography.H2>Use it in your project</Typography.H2>
        <Typography.Text>
            Ask your agent to use Mielui and describe what you want to build. For example:
        </Typography.Text>
        <CodeBlock
            code="Use the mielui skill to build a settings dialog with our existing theme. Check the installed version and use the documented component parts."
            lang="text"
        />
        <Typography.Text>
            The skill preserves package versus source-copy installation, checks the needed component
            pages, and covers keyboard behavior, responsive layout, reduced motion, and overlay
            composition.
        </Typography.Text>
    </section>
    <section class="flex flex-col gap-4">
        <Typography.H2>Documentation for agents</Typography.H2>
        <ul class="flex flex-col gap-3 text-sm leading-6">
            <li>
                <a class="underline underline-offset-4" href="/llms.txt">llms.txt</a>
                — the index of guides, components, actions, and release notes.
            </li>
            <li>
                <a class="underline underline-offset-4" href="/llms-full.txt">llms-full.txt</a>
                — the combined documentation for tools that need a single file.
            </li>
            <li>
                <a class="underline underline-offset-4" href="/docs/skill.md">Skill instructions</a>
                — the complete workflow used by the installed skill.
            </li>
        </ul>
        <Typography.Text>
            Every documentation page has a Copy page menu with its Markdown reference. Prefer
            individual pages for focused tasks; the full reference includes all component examples
            and APIs.
        </Typography.Text>
    </section>
    <section class="flex flex-col gap-4">
        <Typography.H2>Keep version context</Typography.H2>
        <Typography.Text>
            Local source and the locked package version take precedence over live documentation.
            Before upgrading, read the changelog and its agent notes. Unreleased notes describe
            upcoming changes, not the currently published npm package.
        </Typography.Text>
    </section>
</div>
