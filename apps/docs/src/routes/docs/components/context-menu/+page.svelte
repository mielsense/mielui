<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import FileRow from './examples/file-row.svelte';
    import FileRowSrc from './examples/file-row.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Image from './examples/image.svelte';
    import ImageSrc from './examples/image.svelte?raw';
    import TaskCard from './examples/task-card.svelte';
    import TaskCardSrc from './examples/task-card.svelte?raw';

    const _TITLE = 'Context Menu';

    const installCommand = 'pnpm dlx @mielui/svelte add context-menu';
</script>

<svelte:head>
    <title>Mielui · Context Menu</title>
    <meta
        name="description"
        content="A right-click menu for actions that apply to whatever the user clicked on. It uses the same item grammar as DropdownMenu and opens on right-click."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Context Menu">
        A right-click menu of actions, sharing the dropdown menu's item set.
    </PageIntro>

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
        <Typography.Text variant="supporting">
            The theme setting chrome.borders chooses "single" or "double" framing. Double is the
            default. Single removes the extra frame while preserving content padding, composition,
            and inset variants.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Separators span the inner panel width, including submenus. Menu items retain their
            padding.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Bind open to observe or close the root menu, and use onOpenChange for interaction
            callbacks. Pointer and keyboard opening keep the same state.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Open the menu with a right-click, a touch long-press, or the Context Menu key or
            Shift+F10 on its focused trigger. Arrow keys, Home, End, and typing navigate items;
            submenus support directional keys. An item onclick handler can call
            event.preventDefault() to cancel selection and dismissal.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Import and compose with Root, Trigger, Content, and Item:
        </Typography.Text>
        <CodeBlock
            code={`import * as ContextMenu from '$lib/mielui/components/context-menu';\n\n<ContextMenu.Root>\n  <ContextMenu.Trigger>\n    <div>Right-click me</div>\n  </ContextMenu.Trigger>\n  <ContextMenu.Content>\n    <ContextMenu.Item callback={handleAction}>Action</ContextMenu.Item>\n  </ContextMenu.Content>\n</ContextMenu.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Right-click a target to open its menu.
            {/snippet}
        </SectionHeading>

        <div id="file-row" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">File actions</Typography.H3>
            <ComponentPreview code={FileRowSrc}>
                <FileRow />
            </ComponentPreview>
        </div>

        <div id="image" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Image actions</Typography.H3>
            <ComponentPreview code={ImageSrc}>
                <Image />
            </ComponentPreview>
        </div>

        <div id="task-card" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Task actions</Typography.H3>
            <ComponentPreview code={TaskCardSrc}>
                <TaskCard />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on ContextMenu.Content for a translucent background with blur. Omit
            surface to inherit --mielui-surface from your theme, or set surface="solid" to override
            it. The glass surface keeps an opaque fallback when backdrop filtering is unavailable
            and respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
</div>
