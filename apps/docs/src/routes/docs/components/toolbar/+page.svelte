<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Depth from './examples/depth.svelte';
    import DepthSrc from './examples/depth.svelte?raw';
    import Additional from './examples/formatting.svelte';
    import AdditionalSrc from './examples/formatting.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
</script>
<svelte:head>
    <title>Mielui · Toolbar</title>
    <meta
        name="description"
        content="Composable keyboard toolbar with buttons, links, and selectable groups."
    />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Toolbar">
        Composable keyboard toolbar with buttons, links, and selectable groups.
    </PageIntro>
    <section id="hero" class="flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>
    <section id="installation" class="flex flex-col gap-4">
        <Typography.H2>Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add toolbar" />
    </section>
    <section id="usage" class="flex flex-col gap-4">
        <Typography.H2>Usage</Typography.H2>
        <Typography.Text>
            Toolbars are flat by default. Set variant="depth" on Toolbar.Root to opt into raised
            keys and recessed selections. Button, Link, and Item inherit the variant. Depth follows
            the theme's shadow, edge-highlight, and reduced-motion settings.
        </Typography.Text>
        <Typography.Text>
            Import the component subpath as a namespace. Root owns one roving keyboard collection:
            compose Button, Link, Separator, and Group containing Item. Give Root an aria-label or
            aria-labelledby. Set orientation to vertical for vertical arrow navigation, and loop to
            false to stop at the ends. Disabled items are skipped. Each interactive part forwards
            native attributes and bind:element.
        </Typography.Text>
        <Typography.Text>
            Group is a selectable group: use type="single" with a string value, or type="multiple"
            with a string array. Both support bind:value, onValueChange, and disabled. Item requires
            a value and renders a pressed button. Plain visual grouping can use a div without
            introducing another keyboard collection. Separator automatically runs perpendicular to
            the toolbar.
        </Typography.Text>
        <Typography.Text>
            Omit a group, reorder Link before Button, or restyle any part with class. Use the
            toolbar's Item for selections instead of nesting an independent ToggleGroup keyboard
            collection. The existing callable Toolbar export and composer navigation remain
            available for existing integrations; new compositions use Toolbar.Root from the
            component subpath.
        </Typography.Text>
    </section>
    <section id="depth" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Depth variant</Typography.H2>
        <ComponentPreview code={DepthSrc}><Depth /></ComponentPreview>
    </section>
    <section id="formatting" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Multiple selections</Typography.H2>
        <ComponentPreview code={AdditionalSrc}><Additional /></ComponentPreview>
    </section>
    <section id="working-example" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Selection and commands</Typography.H2>
        <Typography.Text>
            Use Item inside a single or multiple Group for persistent choices. Use Toolbar.Button
            for a one-time action such as Clear. Label the toolbar and each icon-only control; the
            examples display the selected tool or apply formatting to a sample sentence.
        </Typography.Text>
    </section>
</div>
