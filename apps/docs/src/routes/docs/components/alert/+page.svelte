<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Action from './examples/action.svelte';
    import ActionSrc from './examples/action.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';

    import Variants from './examples/variants.svelte';
    import VariantsSrc from './examples/variants.svelte?raw';

    const TITLE = 'Alert';
    const SLUG = 'alert';

    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta
        name="description"
        content="Notice strips for inline status, confirmation, and warnings."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title={TITLE}>
        An inset callout with a status icon, a title, and its description on one surface.
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
            An alert is a notice strip: one white plate with a hairline edge, a medium-weight Title,
            and a muted Description. The variant tints the icon only. It never fills the plate or
            colors its border. Put one button or link directly inside Root for a single follow-up
            action. It sits at the end of the strip, and moves under the text when the alert is
            narrow.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Set{' '}
            <Typography.InlineCode>{'icon={false}'}</Typography.InlineCode>
            to omit the default icon, or supply an icon snippet to replace it. Title and Description
            remain separate parts.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Static notices use{' '}
            <Typography.InlineCode>announcement="off"</Typography.InlineCode>
            by default. Use{' '}
            <Typography.InlineCode>announcement="polite"</Typography.InlineCode>
            for routine updates, such as a successful save.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Reserve{' '}
            <Typography.InlineCode>announcement="assertive"</Typography.InlineCode>
            for urgent updates that should interrupt. Keep the live region mounted while its content
            changes. The visual variant does not change announcement urgency.
        </Typography.Text>

        <CodeBlock
            code={`import * as Alert from '@mielui/svelte/components/alert';\n\n<Alert.Root announcement="polite">\n  <Alert.Title>Title</Alert.Title>\n  <Alert.Description>Description</Alert.Description>\n</Alert.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <!-- Variants — each its own example piece -->
        <div id="variants" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Status tones</Typography.H3>
            <ComponentPreview code={VariantsSrc}><Variants /></ComponentPreview>
        </div>

        <div id="action" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With an action</Typography.H3>
            <Typography.Text variant="supporting">
                A button or link placed directly in Root becomes the strip's one action. Keep it
                secondary, and name what it does.
            </Typography.Text>
            <ComponentPreview code={ActionSrc}><Action /></ComponentPreview>
        </div>
    </section>
    <section id="parts" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Title is optional. An alert with only a Description reads as a single line, which suits short notices."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Title and Description render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>
</div>
