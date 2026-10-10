<script lang="ts">
    import * as Attachment from '@mielui/svelte/components/attachment';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { onMount } from 'svelte';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import ChipStatus from './examples/chip-status.svelte';
    import ChipStatusSrc from './examples/chip-status.svelte?raw';
    import SingleExample from './examples/single.svelte';
    import SingleExampleSrc from './examples/single.svelte?raw';
    import StatusVariants from './examples/status-variants.svelte';
    import StatusVariantsSrc from './examples/status-variants.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        usesItems as playgroundUsesItems
    } from './playground';

    const installCommand = 'pnpm dlx @mielui/svelte add attachment';

    let playgroundFiles = $state<File[]>([]);
    let playgroundRejected = $state<Attachment.AttachmentRejection[]>([]);

    onMount(() => {
        playgroundFiles = [
            new File([new Uint8Array(620_000)], 'architecture.pdf', {
                type: 'application/pdf'
            })
        ];
    });
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
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {@const chip = values.variant === 'chip'}
                <Attachment.Root
                    bind:files={playgroundFiles}
                    accept={values.accept || undefined}
                    multiple={values.multiple}
                    maxFiles={values.maxFiles}
                    maxSize={values.maxSize * 1024 * 1024}
                    disabled={values.disabled}
                    onReject={(rejections) => {
                        playgroundRejected = rejections;
                    }}
                    class="flex w-full max-w-sm flex-col items-center gap-3"
                >
                    {#if values.triggerLabel}
                        <Attachment.Trigger
                            variant={values.triggerVariant}
                            size={values.triggerSize}
                        >
                            Choose files
                        </Attachment.Trigger>
                    {:else}
                        <Attachment.Trigger variant={values.triggerVariant} />
                    {/if}
                    {#if playgroundUsesItems(values)}
                        {#each playgroundFiles as file (file)}
                            <Attachment.Item
                                {file}
                                variant={values.variant}
                                status={values.status}
                                progress={values.status === 'uploading'
                                    ? values.progress
                                    : undefined}
                                error={values.status === 'error'
                                    ? values.error || undefined
                                    : undefined}
                                removable={values.removable}
                                class={chip ? undefined : 'w-72 max-w-full'}
                                onRemove={values.removable
                                    ? () => {
                                          playgroundFiles = playgroundFiles.filter(
                                              (item) => item !== file
                                          );
                                      }
                                    : undefined}
                            />
                        {/each}
                    {:else}
                        <Attachment.List
                            variant={values.variant}
                            class="items-center self-stretch sm:justify-center"
                        />
                    {/if}
                    {#each playgroundRejected as rejection (rejection.file)}
                        <Attachment.Item
                            file={rejection.file}
                            variant={values.variant}
                            status="error"
                            error={rejection.reason}
                            class={chip ? undefined : 'w-72 max-w-full'}
                            onRemove={() => {
                                playgroundRejected = playgroundRejected.filter(
                                    (item) => item !== rejection
                                );
                            }}
                        />
                    {/each}
                </Attachment.Root>
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
            Bind selected files on the root and report rejected files from the
            <Typography.InlineCode>onReject</Typography.InlineCode>
            callback. Selection is local only; your application owns uploading and upload state.
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

        <div id="chips" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Chips</Typography.H3>
            <Typography.Text variant="supporting">
                Set
                <Typography.InlineCode>variant="chip"</Typography.InlineCode>
                on List or Item for a compact pill with a file-type icon or image thumbnail, the
                name, and a remove button. A spinner replaces the icon while uploading, and errors
                add a red edge. Progress and status text stay available to assistive technology. Use
                chips above Composer.Root inside the shared Attachment.Root.
            </Typography.Text>
            <ComponentPreview code={ChipStatusSrc}><ChipStatus /></ComponentPreview>
        </div>
    </section>

    <section id="labels" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text>
            Built-in text is English by default. Pass labels to Attachment.Root to translate or
            reword the drop overlay, the trigger, the list, file status, and the remove button.
            Every key is optional; omitted keys keep their default.
        </Typography.Text>
        <CodeBlock
            code={`<Attachment.Root bind:files labels={{ dropzone: 'Déposez des fichiers', add: 'Joindre des fichiers', remove: (name) => \`Retirer \${name}\` }} />`}
            lang="svelte"
            copy="overlay"
        />
    </section>
    <section id="single-file" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">One file at a time</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root lets people choose several files by default. Set `multiple={false}` so the file chooser takes one file at a time, and add `maxFiles={1}` to cap the list at a single file."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"List takes `label`, the accessible name of the list of files. Trigger accepts `element` and `onclick`, which runs before the file chooser opens. Root and Trigger render their `children`."}
            />
        </Typography.Text>
        <ComponentPreview code={SingleExampleSrc}>
            <SingleExample />
        </ComponentPreview>
    </section>
</div>
