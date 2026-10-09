<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import ContentOnly from './examples/content-only.svelte';
    import ContentOnlySrc from './examples/content-only.svelte?raw';
    import Full from './examples/full.svelte';
    import FullSrc from './examples/full.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import HeaderFooter from './examples/header-footer.svelte';
    import HeaderFooterSrc from './examples/header-footer.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Inset from './examples/inset.svelte';
    import InsetSrc from './examples/inset.svelte?raw';
    import InsetPosition from './examples/inset-position.svelte';
    import InsetPositionSrc from './examples/inset-position.svelte?raw';
    import Panel from './examples/panel.svelte';
    import PanelSrc from './examples/panel.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add card';
</script>

<svelte:head>
    <title>Mielui · Card</title>
    <meta name="description" content="Surface container for grouping related content." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Card">
        A surface for grouping related content, composed of header, content, and footer.
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
            Card.Title defaults to an h2. Set level to match the surrounding heading outline;
            styling stays the same. Native heading attributes, including id and aria-describedby,
            reach the heading. Set level to 1 only when the card supplies the page title.
        </Typography.Text>
        <Typography.Text variant="supporting">
            An inset Card accepts one Footer and places it beneath the inset surface. Put multiple
            actions or footer sections inside that single Footer. Other variants render Footer where
            it appears in the composition.
        </Typography.Text>

        <CodeBlock
            code={`import * as Card from '@mielui/svelte/components/card';\nimport { Button } from '@mielui/svelte/components/button';\n\n<Card.Root>\n  <Card.Header>\n    <Card.Title level={2}>Title</Card.Title>\n  </Card.Header>\n  <Card.Content>Content here</Card.Content>\n  <Card.Footer>\n    <Button>Action</Button>\n  </Card.Footer>\n</Card.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <section id="borders" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Borders</Typography.H2>
        <Typography.Text variant="supporting">
            The theme setting chrome.borders is "double" by default, which gives inset and panel
            cards a white frame with a gutter around the recessed content surface. Set it to
            "single" to remove the gutter, so the surface meets the frame's border. Content padding
            and footer composition stay intact. Default cards are one plate and always have one
            border. This setting also applies to dialogs, sheets, Notch, Toast, and other inset
            surfaces; shadows and edge highlights remain independent.
        </Typography.Text>
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set{' '}
            <Typography.InlineCode>surface="glass"</Typography.InlineCode>
            on Root to frost the card so a backdrop behind it shows through. On inset and panel
            cards the frame is frosted and the content surface stays close to opaque, so text keeps
            its contrast. A default card has one surface, which turns translucent.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Cards are solid unless you ask for glass. They do not follow the theme's glass setting
            the way overlays do. The frame follows the border setting: double borders show it as a
            gutter around the surface, and single borders show it as the footer strip. Without
            backdrop filter support, or with reduced transparency, the card stays solid.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="full" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Full composition</Typography.H3>
            <Typography.Text variant="supporting">
                Header, Content and Footer together. The footer holds the actions and a status line.
            </Typography.Text>
            <ComponentPreview code={FullSrc}>
                <Full />
            </ComponentPreview>
        </div>

        <div id="content-only" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Content only</Typography.H3>
            <Typography.Text variant="supporting">
                A card can be Content alone, for a single figure or a short note.
            </Typography.Text>
            <ComponentPreview code={ContentOnlySrc}>
                <ContentOnly />
            </ComponentPreview>
        </div>

        <div id="header-footer" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Header and footer</Typography.H3>
            <Typography.Text variant="supporting">
                Leave Content out when the title and description say everything. The footer then
                sits one step under the header.
            </Typography.Text>
            <ComponentPreview code={HeaderFooterSrc}>
                <HeaderFooter />
            </ComponentPreview>
        </div>

        <div id="panel" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Panel frame</Typography.H3>
            <Typography.Text variant="supporting">
                The panel variant draws an inner ring around the surface. It suits compact,
                read-only details.
            </Typography.Text>
            <ComponentPreview code={PanelSrc}>
                <Panel />
            </ComponentPreview>
        </div>

        <div id="inset" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Inset frame</Typography.H3>
            <Typography.Text variant="supporting">
                The inset variant puts the content on an inner surface and the footer on the frame
                under it.
            </Typography.Text>
            <ComponentPreview code={InsetSrc}>
                <Inset />
            </ComponentPreview>
        </div>

        <div id="inset-position" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Footer position</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"An inset card shows its footer under the content by default. The `--mielui-inset-position` token moves it and takes `bottom` or `top`. You write the Footer in the same place either way, and the card reorders it."}
                />
            </Typography.Text>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'Set the token on one card with `class="[--mielui-inset-position:top]"`, as this example does. To move the strip on every inset card, dialog and toast at once, set it on `:root` in your CSS after importing `ui.css`, or choose Surface, then Inset strip, in Theme Studio.'}
                />
            </Typography.Text>
            <ComponentPreview code={InsetPositionSrc}>
                <InsetPosition />
            </ComponentPreview>
            <CodeBlock
                code={`:root {\n    --mielui-inset-position: top;\n}`}
                lang="css"
                copy="overlay"
            />
        </div>
    </section>
    <section id="parts" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"A card is assembled from parts, and you include only the ones you need. A card with just Content is as valid as one with a header and a footer."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Header, Title, Description, Content and Footer render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>
</div>
