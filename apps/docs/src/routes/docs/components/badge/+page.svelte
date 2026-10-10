<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';

    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import PencilIcon from './examples/pencil-icon.svelte';
    import Shapes from './examples/shapes.svelte';
    import ShapesSrc from './examples/shapes.svelte?raw';

    import Variants from './examples/variants.svelte';
    import VariantsSrc from './examples/variants.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const installCommand = 'pnpm dlx @mielui/svelte add badge';
</script>

<svelte:head>
    <title>Mielui · Badge</title>
    <meta name="description" content="Compact labels for status, counts, and tags." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Badge">A compact label for status, counts, and tags.</PageIntro>
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {@const icon = values.icon ? PencilIcon : undefined}
                {#if values.link}
                    <Badge
                        variant={values.variant}
                        {icon}
                        iconSize={values.iconSize}
                        dot={values.dot}
                        href="/docs/components/badge"
                    >
                        {values.label}
                    </Badge>
                {:else}
                    <Badge
                        variant={values.variant}
                        {icon}
                        iconSize={values.iconSize}
                        dot={values.dot}
                    >
                        {values.label}
                    </Badge>
                {/if}
            {/snippet}
        </Playground>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Providing href renders a link and accepts native anchor attributes such as target, rel,
            and download. Without href, Badge renders a div and accepts div attributes. An empty
            href still renders a link. Narrow optional URLs before choosing the linked or static
            form.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Badges are static metadata by default. Add role="status" explicitly only when changing
            badge text should be announced as a status update.
        </Typography.Text>

        <CodeBlock
            code={`import { Badge } from '@mielui/svelte/components/badge';\n\n<Badge>New</Badge>\n<Badge variant="outline" dot>Label</Badge>\n<Badge variant="success">Active</Badge>\n<Badge variant="error">Failed</Badge>`}
            lang="svelte"
            copy="overlay"
        />
    </section>
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="status-list" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Status list</Typography.H3>
            <Typography.Text variant="supporting">
                A badge at the end of each row reports the state of that row.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="shapes" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Shapes</Typography.H3>
            <Typography.Text variant="supporting">
                Badges are small flat pills that share one height. Only the outline variant draws a
                hairline. Use class to adjust the corner radius.
            </Typography.Text>
            <ComponentPreview code={ShapesSrc}>
                <Shapes />
            </ComponentPreview>
        </div>

        <div id="variants" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Variants</Typography.H3>
            <ComponentPreview code={VariantsSrc}><Variants /></ComponentPreview>
        </div>
    </section>
    <section id="icon" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Icon</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`icon` takes a Svelte component and renders it before the text. The component receives `size` and `class`, so any icon component with those two props works. `iconSize` sets that size in pixels and defaults to 13. For anything else, such as a status dot or a count, put it in `children` next to the text."}
            />
        </Typography.Text>
    </section>
</div>
