<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';

    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import WithGroups from './examples/with-groups.svelte';
    import WithGroupsSrc from './examples/with-groups.svelte?raw';

    const TITLE = 'Command';
    const SLUG = 'command';

    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta name="description" content="Fast command palette dialog with search and grouping." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>
                {TITLE}
            </Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                A command palette with fuzzy search and grouped results. Often opened with
                <Kbd shortcut="cmd+K" />
                .
            </Typography.Text>
        </div>
        <DocsPager />
    </header>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}>
            <Hero />
        </ComponentPreview>
    </section>

    <!-- ─── Installation ──────────────────────────────────────────── -->
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>

        <Typography.Text>
            The palette opens and closes without an entrance or exit animation so repeated keyboard
            invocation stays immediate. Dialog still manages focus, dismissal and background
            isolation. Search keeps matching rows and the active command in sync when items are
            added, removed, renamed or disabled while a query is active.
        </Typography.Text>
        <Typography.Text>
            Search composes native input and keyboard handlers; preventDefault in onkeydown cancels
            command navigation or activation. Enter during text composition confirms the text
            without running a command. Item forwards data attributes to its button or link.
        </Typography.Text>
        <CodeBlock
            code={`import * as Command from '$lib/mielui/components/command';\n\n<Command.Root>\n  <Command.Trigger>Open palette</Command.Trigger>\n  <Command.Content>\n    <Command.Header>\n      <span>Command</span>\n    </Command.Header>\n    <Command.Search placeholder="Search..." />\n    <Command.Results>\n      <Command.Item name="search">Item</Command.Item>\n    </Command.Results>\n  </Command.Content>\n</Command.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <section id="slots" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Search and empty-state slots</Typography.H2>
        <Typography.Text>
            Search accepts icon, count(total) and announcement(message) snippets. The count is
            decorative; announcement stays inside the shared polite live region. Results accepts an
            empty snippet. Omit any slot to retain its default, or supply an empty snippet to hide
            its content. These slots use the same filtered result count and announcement as the
            built-in rendering.
        </Typography.Text>
        <CodeBlock
            code={`<Command.Search placeholder="Find a command">\n  {#snippet icon()}<span aria-hidden="true">⌘</span>{/snippet}\n  {#snippet count(total)}{total} matches{/snippet}\n  {#snippet announcement(message)}{message}{/snippet}\n</Command.Search>\n<Command.Results>\n  {#snippet empty()}<p>Try a different search.</p>{/snippet}\n  <Command.Item value="settings">Open settings</Command.Item>\n</Command.Results>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <!-- With groups -->
        <div id="with-groups" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With groups</Typography.H3>
            <ComponentPreview code={WithGroupsSrc}>
                <WithGroups />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on Command.Content for a translucent background with blur. Solid
            remains the default. The glass surface keeps an opaque fallback when backdrop filtering
            is unavailable and respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
</div>
