<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import BasicMenu from './examples/basic-menu.svelte';
    import BasicMenuSrc from './examples/basic-menu.svelte?raw';
    import Configuration from './examples/configuration.svelte';
    import ConfigurationSrc from './examples/configuration.svelte?raw';
    import DynamicWidth from './examples/dynamic-width.svelte';
    import DynamicWidthSrc from './examples/dynamic-width.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import OverlayBorders from './examples/overlay-borders.svelte';
    import OverlayBordersSrc from './examples/overlay-borders.svelte?raw';
    import RowActions from './examples/row-actions.svelte';
    import RowActionsSrc from './examples/row-actions.svelte?raw';
    import ShareMenu from './examples/share-menu.svelte';
    import ShareMenuSrc from './examples/share-menu.svelte?raw';
    import SortMenu from './examples/sort-menu.svelte';
    import SortMenuSrc from './examples/sort-menu.svelte?raw';
    import UserMenu from './examples/user-menu.svelte';
    import UserMenuSrc from './examples/user-menu.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add dropdown-menu';
</script>

<svelte:head>
    <title>Mielui · Dropdown Menu</title>
    <meta
        name="description"
        content="A list of actions anchored to a button. Use it for user menus, row-level actions, and anywhere a `…` button needs to do more than one thing."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Dropdown Menu">A menu of actions anchored to a button.</PageIntro>

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
            Use Arrow keys, Home, End, or type a label to move between enabled items. Submenus
            support directional keyboard navigation. Items close the menu after selection; an
            onclick handler can call event.preventDefault() to cancel selection and dismissal. Bind
            checked or value to retain selections outside the mounted menu.
        </Typography.Text>

        <CodeBlock
            code={`import * as DropdownMenu from '$lib/mielui/components/dropdown-menu';\nimport Kbd from '$lib/mielui/components/kbd';\n\n<DropdownMenu.Root>\n  <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>\n  <DropdownMenu.Content>\n    <DropdownMenu.Item callback={handleClick}>\n      Action\n      <Kbd shortcut="cmd+K" />\n    </DropdownMenu.Item>\n  </DropdownMenu.Content>\n</DropdownMenu.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <!-- Basic menu -->
        <div id="basic-menu" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Basic menu</Typography.H3>
            <ComponentPreview code={BasicMenuSrc}>
                <BasicMenu />
            </ComponentPreview>
        </div>

        <!-- Grouped (user) menu -->
        <div id="user-menu" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Grouped items</Typography.H3>
            <ComponentPreview code={UserMenuSrc}>
                <UserMenu />
            </ComponentPreview>
        </div>

        <!-- Row actions -->
        <div id="row-actions" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Row actions</Typography.H3>
            <ComponentPreview code={RowActionsSrc}>
                <RowActions />
            </ComponentPreview>
        </div>

        <!-- Share menu -->
        <div id="share-menu" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Share menu</Typography.H3>
            <ComponentPreview code={ShareMenuSrc}>
                <ShareMenu />
            </ComponentPreview>
        </div>

        <!-- Sort menu -->
        <div id="sort-menu" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Sort menu</Typography.H3>
            <ComponentPreview code={SortMenuSrc}>
                <SortMenu />
            </ComponentPreview>
        </div>

        <div id="configuration-menu" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Configuration submenu</Typography.H3>
            <Typography.Text variant="supporting">
                Nested choices for configuring a model, effort level, and response speed.
            </Typography.Text>
            <ComponentPreview code={ConfigurationSrc}>
                <Configuration />
            </ComponentPreview>
        </div>

        <div id="dynamic-width" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Dynamic width</Typography.H3>
            <Typography.Text variant="supporting">
                Menus and submenus size to their longest item plus a buffer instead of hugging the
                trigger.
            </Typography.Text>
            <ComponentPreview code={DynamicWidthSrc}>
                <DynamicWidth />
            </ComponentPreview>
        </div>
    </section>
    <section id="overlay-borders" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Borders</Typography.H2>
        <Typography.Text variant="supporting">
            Set chrome.borders to "single" or "double" in your theme. Double is the default. This
            example overrides the generated inset token locally so you can compare both styles.
        </Typography.Text>
        <ComponentPreview code={OverlayBordersSrc}><OverlayBorders /></ComponentPreview>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on DropdownMenu.Content for a translucent background with blur.
            Without a surface prop, the component follows --mielui-surface. An unset variable keeps
            it solid; surface="solid" overrides a global glass theme. The glass surface keeps an
            opaque fallback when backdrop filtering is unavailable and respects reduced-transparency
            preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
</div>
