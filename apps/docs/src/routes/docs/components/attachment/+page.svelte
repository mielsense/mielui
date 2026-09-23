<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';

    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import StatusVariants from './examples/status-variants.svelte';
    import StatusVariantsSrc from './examples/status-variants.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add attachment';
</script>

<svelte:head>
    <title>Mielui · Attachment</title>
    <meta
        name="description"
        content="Local file selection with drop handling, constraints, and composable attachment states."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Attachment">
        Select, validate, preview, and remove local files before your application uploads them.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Bind selected files on the root and report rejected files from
            <Typography.InlineCode>onReject</Typography.InlineCode>
            . Selection is local only; your application owns uploading and upload state.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Set accept, maxFiles, and maxSize to limit selection. Set disabled to prevent adding or
            removing files and clear the drag highlight.
        </Typography.Text>
        <CodeBlock
            code={`import * as Attachment from '@mielui/svelte/components/attachment';
import type { AttachmentRejection } from '@mielui/svelte/components/attachment';

let files = $state<File[]>([]);

function handleReject(rejections: AttachmentRejection[]) {
  console.log(rejections);
}

<Attachment.Root
  bind:files
  accept="image/*,.pdf"
  maxFiles={3}
  maxSize={5 * 1024 * 1024}
  onReject={handleReject}
>
  <Attachment.Trigger>Choose files</Attachment.Trigger>
  <Attachment.List />
</Attachment.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <section id="integration" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Selection and upload ownership</Typography.H2>
        <Typography.Text variant="supporting">
            Attachment validates local selection and displays files. It does not upload them. Keep
            upload progress and errors in your application, or use File Upload when you need an
            upload callback with cancellation and retry. Use the hero to test rejection messages and
            remove selected files. Progress is clamped from 0 to 100; omitted or nonfinite values
            display an indeterminate progress indicator.
        </Typography.Text>
    </section>
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Render standalone items when your upload client owns progress and completion state.
            {/snippet}
        </SectionHeading>

        <div id="status-variants" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Upload status</Typography.H3>
            <ComponentPreview code={StatusVariantsSrc}><StatusVariants /></ComponentPreview>
        </div>
    </section>
</div>
