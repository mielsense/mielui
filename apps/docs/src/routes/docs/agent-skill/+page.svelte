<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Rows from '$lib/components/docs/rows.svelte';

    const references = [
        {
            label: 'llms.txt',
            value: 'Lists guides, components, actions, and release notes.',
            href: '/llms.txt'
        },
        {
            label: 'llms-full.txt',
            value: 'Combines the documentation into one file.',
            href: '/llms-full.txt'
        },
        {
            label: 'Skill instructions',
            value: 'Describe the workflow used by the installed skill.',
            href: '/docs/skill.md'
        },
        {
            label: 'Design skill instructions',
            value: 'Give the layouts, scales, and rules of the design skill.',
            href: '/docs/design-skill.md'
        }
    ];
</script>

<svelte:head>
    <title>Mielui · Agent skill</title>
    <meta
        name="description"
        content="Give coding agents current Mielui APIs, composition patterns, and design guidance."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-16">
    <PageIntro title="Agent skill">
        Give your coding agent Mielui's component APIs, composition patterns, and design guidance.
    </PageIntro>

    <section id="install-the-skill" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Install the skill</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Run this command from your project and select your coding agent in the installer.
        </Typography.Text>
        <CodeBlock copy="overlay" code="npx skills add mielsense/mielui --skill mielui" lang="sh" />
        <Typography.Text variant="body" class="m-0">
            The skill is stored in the repository and loads current documentation when used. It
            checks the installed version before recommending an API.
        </Typography.Text>
    </section>

    <section id="use-it" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Use it in your project</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Ask your agent to use Mielui and describe what you want to build. For example:
        </Typography.Text>
        <CodeBlock
            copy="overlay"
            code={`Use the mielui skill to build a settings dialog with our existing theme.
Check the installed version and use the documented component parts.`}
            lang="text"
        />
        <Typography.Text variant="body" class="m-0">
            The skill checks your installation method and the relevant component pages before
            proposing code. Its review covers keyboard behavior, responsive layout, reduced motion,
            and nested overlays.
        </Typography.Text>
    </section>

    <section id="design-skill" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Add the design skill</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            The first skill covers components. The design skill covers the page around them: the app
            shell, the page header, the grid, the spacing between sections, and what to leave out.
            Install it when you want an agent to build a dashboard, an admin app, a chat workspace,
            or a marketing site.
        </Typography.Text>
        <CodeBlock
            copy="overlay"
            code="npx skills add mielsense/mielui --skill mielui-design"
            lang="sh"
        />
        <Typography.Text variant="body" class="m-0">
            Then describe the product and the pages you need:
        </Typography.Text>
        <CodeBlock
            copy="overlay"
            code={`Use the mielui-design skill to build an analytics dashboard for our store.
It needs an overview, an orders table, and a settings page.`}
            lang="text"
        />
        <Typography.Text variant="body" class="m-0">
            It carries layout skeletons for three app shells, dashboards, data tables, settings,
            chat workspaces, and marketing pages, along with the spacing and type scales. It asks
            the agent to open the result at desktop and phone widths in both themes before it
            reports back.
        </Typography.Text>
    </section>

    <section id="documentation-for-agents" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Documentation for agents</Typography.H2>
        <Rows items={references} label="Documentation for agents" />
        <Typography.Text variant="body" class="m-0">
            Every documentation page has a Copy page menu with its Markdown reference. Prefer
            individual pages for focused tasks; the full reference includes all component examples
            and APIs.
        </Typography.Text>
    </section>

    <section id="version-context" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Keep version context</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Mielui is maintained independently from its Sivir UI origins. The skill uses Mielui's
            own references; Sivir examples are not a compatibility guarantee.
        </Typography.Text>
        <Typography.Text variant="body" class="m-0">
            Local source and the locked package version take precedence over live documentation.
            Before upgrading, read the changelog and its agent notes. Unreleased notes describe
            upcoming changes, not the currently published npm package. Mielui 0.2.1 requires Svelte
            5.56 or newer within Svelte 5.
        </Typography.Text>
    </section>
</div>
