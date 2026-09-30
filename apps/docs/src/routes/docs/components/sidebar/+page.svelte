<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Custom from './examples/custom.svelte';
    import CustomSrc from './examples/custom.svelte?raw';
    import Double from './examples/double.svelte';
    import DoubleSrc from './examples/double.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';

    const composition = `<Sidebar.Root breakpoint={768} class="h-screen">
  <Sidebar.Panel id="navigation" label="Workspace navigation" variant="inset">
    <Sidebar.Header><Sidebar.Label>Workspace</Sidebar.Label><Sidebar.Trigger /></Sidebar.Header>
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
        <Sidebar.Menu>
          <Sidebar.MenuItem><Sidebar.Link href="/projects" label="All projects" /></Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Group>
    </Sidebar.Content>
  </Sidebar.Panel>
  <Sidebar.Main>
    <Sidebar.Trigger panel="navigation" />
    <!-- Render your page here. Footer is optional. -->
  </Sidebar.Main>
</Sidebar.Root>`;
</script>

<svelte:head>
    <title>Mielui · Sidebar</title>
    <meta
        name="description"
        content="Composable sidebars with independent panels, icon rails, pinning, resizing, inset surfaces, and accessible mobile drawers."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Sidebar">
        Compose navigation, adjacent section panels, and inspectors around your content.
    </PageIntro>
    <section id="hero" class="flex scroll-mt-20 flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>
    <section id="installation" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add sidebar" />
        <Typography.Text variant="supporting">
            Package users import from @mielui/svelte/components/sidebar. Source-copy installation
            includes Button, Tooltip, Sheet, and their shared overlay helpers.
        </Typography.Text>
    </section>
    <section id="composition" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Compose your layout</Typography.H2>
        <Typography.Text>
            Root provides a scoped panel registry and responsive layout. Place start panels before
            Main and end panels after it, in reading order. Main is a div; choose your own main
            landmark. Root fills its parent width and inherits the height you give it.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Panel owns the frame. Header and Footer stay outside the scrolling Content; inset panels
            put Content on the shared inner surface. Every region can be omitted, reordered, or
            restyled. Group, GroupLabel, Separator, Menu, and MenuItem organize navigation without
            assuming your routing or data model.
        </Typography.Text>
        <CodeBlock code={composition} lang="svelte" />
    </section>
    <section id="state" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">State and controls</Typography.H2>
        <Typography.Text>
            Desktop panels start expanded and pinned. Bind open, pinned, and width for
            application-owned state. An unpinned open panel overlays Main while retaining its
            collapsed footprint; outside interaction or Escape closes it. Pin reserves its expanded
            width again. Trigger toggles the current desktop state or the mobile drawer, and Close
            dismisses it. Controls outside a Panel must pass its id through panel.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Use stable, nonempty panel ids, unique within each Root. Call getSidebar(id) during
            component initialization to read reactive state and use setOpen, setMobileOpen,
            setPinned, setWidth, toggle, or close. Inside a Panel, omit the id. Change callbacks
            fire for changes made through Sidebar controls and setters, not for assignments you make
            to your bindings. Store persistence, route changes, permission checks, and shortcuts in
            your app.
        </Typography.Text>
        <Typography.Text variant="supporting">
            collapsible="rail" retains icons and hides labels. Link and Button require a label for
            their accessible name and collapsed tooltip; leading and trailing snippets hold icons
            and supporting details. Links remain native anchors: use aria-current="page" for the
            current route. Use aria-pressed on buttons that select an in-place view. Navigation does
            not automatically dismiss the panel; call close after your app completes navigation if
            needed.
        </Typography.Text>
        <Typography.Text variant="supporting">
            collapsible="offcanvas" leaves no collapsed footprint. Keep a Trigger outside that Panel
            so it can be reopened. collapsible="none" remains expanded on desktop and omits collapse
            and pin controls; mobile still uses a drawer. A rail snippet replaces collapsed content
            while preserving the full content's DOM and local state.
        </Typography.Text>
    </section>
    <section id="double-panels" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">
            Rail, section panel, and inspector
        </Typography.H2>
        <Typography.Text variant="supporting">
            A primary icon rail and independently collapsible section panel reproduce a two-level
            workspace. Add a side="end" inspector without coupling its state to the navigation.
            Select a member to open this example’s unpinned inspector. This example omits the
            section footer and uses native app state for the selected view.
        </Typography.Text>
        <ComponentPreview code={DoubleSrc}><Double /></ComponentPreview>
    </section>
    <section id="custom-composition" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">
            Custom rail and nested navigation
        </Typography.H2>
        <Typography.Text variant="supporting">
            Compose disclosures with Collapsible. This floating panel omits Footer, supplies a
            replacement rail, and lets you switch between left-to-right and right-to-left layouts.
            Classes on public parts let you change density and alignment.
        </Typography.Text>
        <ComponentPreview code={CustomSrc}><Custom /></ComponentPreview>
    </section>
    <section id="responsive" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Responsive drawers and resizing</Typography.H2>
        <Typography.Text>
            Below Root's breakpoint, measured against its container width in CSS pixels, panels
            become modal drawers. They start closed, independently of desktop open. Bind mobileOpen
            separately. Opening one mobile panel closes another in the same Root; returning to
            desktop closes the drawer and preserves the desktop state.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Drawers reuse Sheet's focus management, Escape, outside dismissal, inert background,
            scroll locking, and focus return. Server rendering starts with the desktop composition
            and adapts after measurement. Crossing the breakpoint remounts panel contents; keep form
            data you need across that change in your application.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Width defaults to 256px, railWidth to 56px, minWidth to 160px, and maxWidth to 480px.
            Width is clamped to finite bounds. Add ResizeHandle inside Panel to opt into resizing.
            Drag its inner edge or focus it and use Left/Right; Shift changes by 32px instead of
            8px. Home and End choose the bounds. Escape, pointer cancellation, and window blur
            restore the starting width. RTL and end panels reverse the drag direction.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Desktop footprint changes use the theme's panel motion and continue from the current
            position when interrupted. Resize gestures track the pointer immediately. Reduced motion
            and zero-duration themes make layout changes immediate. Fixed content widths and hidden
            rail labels prevent text from repeatedly wrapping during expansion.
        </Typography.Text>
    </section>
</div>
