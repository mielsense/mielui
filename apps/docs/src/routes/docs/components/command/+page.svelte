<script lang="ts">
    import {
        Add01Icon as Plus,
        Search01Icon as Search,
        Settings01Icon as Settings,
        UserAdd01Icon as UserPlus,
        UserGroupIcon as Users
    } from '@hugeicons/core-free-icons';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Command from '@mielui/svelte/components/command';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import ControlledExample from './examples/controlled.svelte';
    import ControlledExampleSrc from './examples/controlled.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import WithGroups from './examples/with-groups.svelte';
    import WithGroupsSrc from './examples/with-groups.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usageCode = `<script lang="ts">
    import * as Command from '@mielui/svelte/components/command';
</${'script'}>

<Command.Root>
    <Command.Trigger>Open palette</Command.Trigger>
    <Command.Content>
        <Command.Header>Workspace</Command.Header>
        <Command.Search />
        <Command.Results>
            <Command.Item name="New project">New project</Command.Item>
            <Command.Item name="Settings" href="/settings">Settings</Command.Item>
        </Command.Results>
    </Command.Content>
</Command.Root>`;

    const labelsCode = `<script lang="ts">
    import * as Command from '@mielui/svelte/components/command';
    import type { CommandLabels } from '@mielui/svelte/components/command';

    const labels: CommandLabels = {
        palette: 'Palette de commandes',
        searchPlaceholder: 'Rechercher une commande…',
        search: 'Rechercher',
        results: 'Commandes',
        empty: 'Aucun résultat',
        available: (count) => {
            return count === 0 ? 'Aucune commande.' : \`\${count} commandes disponibles.\`;
        }
    };
</${'script'}>

<Command.Root {labels}>
    <Command.Trigger>Ouvrir la palette</Command.Trigger>
    <Command.Content>
        <Command.Search />
        <Command.Results>
            <Command.Item name="Nouveau projet">Nouveau projet</Command.Item>
        </Command.Results>
    </Command.Content>
</Command.Root>`;
</script>

<svelte:head>
    <title>Mielui · Command</title>
    <meta
        name="description"
        content="A command palette dialog with fuzzy search and grouped results."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Command">
        A command palette with fuzzy search and grouped results. Pair it with{' '}
        <Kbd shortcut="cmd+K" />
        {' '}
        or another shortcut.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#snippet actions()}
                    <Command.Item name="New project">
                        {#if values.icons}
                            <HugeiconsIcon icon={Plus} size={14} />
                        {/if}
                        New project
                    </Command.Item>
                    <Command.Item name="Invite teammate" disabled={values.disabledItem}>
                        {#if values.icons}
                            <HugeiconsIcon icon={UserPlus} size={14} />
                        {/if}
                        Invite teammate
                    </Command.Item>
                {/snippet}
                {#snippet navigation()}
                    <Command.Item name="Settings">
                        {#if values.icons}
                            <HugeiconsIcon icon={Settings} size={14} />
                        {/if}
                        Settings
                    </Command.Item>
                    <Command.Item name="Team">
                        {#if values.icons}
                            <HugeiconsIcon icon={Users} size={14} />
                        {/if}
                        Team
                    </Command.Item>
                {/snippet}
                {#key values.header}
                    <Command.Root>
                        <Command.Trigger variant={values.variant}>
                            <HugeiconsIcon icon={Search} size={14} />
                            Open palette
                        </Command.Trigger>
                        <Command.Content
                            surface={values.surface === 'theme' ? undefined : values.surface}
                        >
                            {#if values.header}
                                <Command.Header>Workspace</Command.Header>
                            {/if}
                            <Command.Search />
                            <Command.Results>
                                {#if values.groups}
                                    <Command.Group heading="Actions">
                                        {@render actions()}
                                    </Command.Group>
                                {:else}
                                    {@render actions()}
                                {/if}
                                {#if values.separator}
                                    <Command.Separator />
                                {/if}
                                {#if values.groups}
                                    <Command.Group heading="Go to">
                                        {@render navigation()}
                                    </Command.Group>
                                {:else}
                                    {@render navigation()}
                                {/if}
                            </Command.Results>
                        </Command.Content>
                    </Command.Root>
                {/key}
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add command" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Compose Trigger and Content inside Root, with Search and Results in Content. Content is
            a modal dialog that manages focus and closes on Escape. Search updates the matching
            results when items change, including while a query is active.
        </Typography.Text>
        <Typography.Text>
            Search composes native input and keyboard handlers; preventDefault in onkeydown cancels
            command navigation or activation. Enter during text composition confirms the text
            without running a command. Item forwards data attributes to its button or link.
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
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
            code={`<Command.Search placeholder="Find a command">
    {#snippet icon()}
        <span aria-hidden="true">⌘</span>
    {/snippet}
    {#snippet count(total)}
        {total} matches
    {/snippet}
    {#snippet announcement(message)}
        {message}
    {/snippet}
</Command.Search>
<Command.Results>
    {#snippet empty()}
        <p>Try a different search.</p>
    {/snippet}
    <Command.Item name="Open settings">Open settings</Command.Item>
</Command.Results>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="workspace-palette" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Workspace palette</Typography.H3>
            <Typography.Text variant="supporting">
                A search field opens a palette with a header, three groups, and a shortcut hint on
                one item.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="with-groups" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With groups</Typography.H3>
            <ComponentPreview code={WithGroupsSrc}>
                <WithGroups />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on Content for a translucent panel with blur, or surface="solid" for
            an opaque one. Without surface, the panel follows the theme. Glass falls back to an
            opaque panel when backdrop filtering is unavailable or reduced transparency is on.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}>
            <Glass />
        </ComponentPreview>
    </section>
    <section id="controlling-the-palette" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Controlling the palette</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `open` on Root to show the palette from a keyboard shortcut or a menu item, and use `onOpenChange` to hear when it opens or closes. A press outside closes it unless you set `allowClickOutside={false}` on Content. `labels.palette` on Root is the palette's accessible name and defaults to Command palette."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Search filters with fuzzy matching. `threshold` sets how forgiving it is, from 0 for an exact match to 1 for nearly anything, and defaults to 0.2."}
            />
        </Typography.Text>
        <ComponentPreview code={ControlledExampleSrc}>
            <ControlledExample />
        </ComponentPreview>
    </section>
    <section id="trigger-and-items" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Trigger and items</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Trigger is built on [Button](/docs/components/button). `disabled` blocks it, `loading` with `labels` shows progress, `element` binds the DOM node, `unstyled` removes the Button classes, and `onclick` runs before the palette opens."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Give an Item `callback` to run an action, or `href` to navigate. The palette closes after either, so do not add a second click handler that repeats the action. `onclick` runs right after `callback`, `name` is the text the search matches, and `value` identifies the item when names repeat. `disabled` keeps it visible but unselectable."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Content, Header, Results, Group, Item, Separator and Trigger render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>
    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text>
            Built-in text is English. Pass a CommandLabels object to labels on Root to translate the
            palette's name, the search placeholder, the names of the search input and the results
            list, the empty message, and the result count announced to screen readers. available is
            a function of the count so the number can sit anywhere in the sentence. Every key is
            optional, and an omitted key keeps its English default. A placeholder on Search wins
            over labels.searchPlaceholder.
        </Typography.Text>
        <CodeBlock code={labelsCode} lang="svelte" copy="overlay" />
    </section>
</div>
