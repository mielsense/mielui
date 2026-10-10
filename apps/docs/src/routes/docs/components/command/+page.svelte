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

{#snippet emptyMessage()}
    <p class="text-sm text-foreground-muted">Nothing matches. Try another word.</p>
{/snippet}

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title={TITLE}>
        A command palette with fuzzy search and grouped results. Pair it with{' '}
        <Kbd shortcut="cmd+K" />
        {' '}
        or another shortcut.
    </PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#key values.header}
                    <Command.Root>
                        <Command.Trigger variant={values.variant}>
                            <HugeiconsIcon icon={Search} size={14} />
                            Open palette
                        </Command.Trigger>
                        <Command.Content
                            surface={values.glass ? 'glass' : undefined}
                            allowClickOutside={values.allowClickOutside}
                        >
                            {#if values.header}
                                <Command.Header>Workspace</Command.Header>
                            {/if}
                            <Command.Search
                                placeholder={values.placeholder}
                                threshold={values.threshold}
                            />
                            <Command.Results empty={values.empty ? emptyMessage : undefined}>
                                {#if values.groups}
                                    <Command.Group heading="Actions">
                                        <Command.Item name="New project">
                                            {#if values.icons}
                                                <HugeiconsIcon icon={Plus} size={14} />
                                            {/if}
                                            New project
                                        </Command.Item>
                                        <Command.Item
                                            name="Invite teammate"
                                            disabled={values.disabledItem}
                                        >
                                            {#if values.icons}
                                                <HugeiconsIcon icon={UserPlus} size={14} />
                                            {/if}
                                            Invite teammate
                                        </Command.Item>
                                    </Command.Group>
                                {:else}
                                    <Command.Item name="New project">
                                        {#if values.icons}
                                            <HugeiconsIcon icon={Plus} size={14} />
                                        {/if}
                                        New project
                                    </Command.Item>
                                    <Command.Item
                                        name="Invite teammate"
                                        disabled={values.disabledItem}
                                    >
                                        {#if values.icons}
                                            <HugeiconsIcon icon={UserPlus} size={14} />
                                        {/if}
                                        Invite teammate
                                    </Command.Item>
                                {/if}
                                {#if values.separator}
                                    <Command.Separator />
                                {/if}
                                {#if values.groups}
                                    <Command.Group heading="Go to">
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
                                    </Command.Group>
                                {:else}
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
                                {/if}
                            </Command.Results>
                        </Command.Content>
                    </Command.Root>
                {/key}
            {/snippet}
        </Playground>
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
            Compose Trigger, Search, and Results inside Root. Content manages focus and Escape
            dismissal. Search updates matching results when items change, including while a query is
            active.
        </Typography.Text>
        <Typography.Text>
            Search composes native input and keyboard handlers; preventDefault in onkeydown cancels
            command navigation or activation. Enter during text composition confirms the text
            without running a command. Item forwards data attributes to its button or link.
        </Typography.Text>
        <CodeBlock
            code={`import * as Command from '@mielui/svelte/components/command';\n\n<Command.Root>\n  <Command.Trigger>Open palette</Command.Trigger>\n  <Command.Content>\n    <Command.Header>\n      <span>Command</span>\n    </Command.Header>\n    <Command.Search placeholder="Search..." />\n    <Command.Results>\n      <Command.Item name="search">Item</Command.Item>\n    </Command.Results>\n  </Command.Content>\n</Command.Root>`}
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
    <section id="working-example" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Make selection do something</Typography.H2>
        <Typography.Text>
            Use callback for an action or href for navigation. The examples report the selected
            command below the trigger. Filtering, keyboard movement, and closing remain owned by
            Command; avoid attaching a second click handler that performs the same action twice.
        </Typography.Text>
    </section>
    <section id="controlling-the-palette" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Controlling the palette</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `open` on Root to show the palette from a keyboard shortcut or a menu item, and use `onOpenChange` to hear when it opens or closes. A press outside closes it unless you set `allowClickOutside={false}` on Content. `label` on Content is the palette's accessible name and defaults to Command palette."}
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
    <section id="trigger-and-items" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Trigger and items</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Trigger is built on [Button](/docs/components/button). `disabled` blocks it, `loading` with `loadingLabel`, `successLabel` and `errorLabel` shows progress, `element` binds the DOM node, `unstyled` removes the Button classes, and `onclick` runs before the palette opens."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Item takes `disabled` to stay visible but unselectable, and `onclick`, which runs right after `callback` when the item is clicked."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Content, Header, Results, Group, Item, Separator and Trigger render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>
</div>
