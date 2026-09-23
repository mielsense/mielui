<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Single from './examples/single.svelte';
    import SingleSrc from './examples/single.svelte?raw';
</script>
<svelte:head>
    <title>Mielui · File Upload</title>
    <meta
        name="description"
        content="File uploads with progress, cancellation, retry, and animated completion."
    />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="File Upload">
        Drop files, follow their progress, and retry failed uploads.
    </PageIntro>
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add file-upload" />
    </section>
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Upload behavior</Typography.H2>
        <Typography.Text variant="supporting">
            Root validates each selection, then calls onUpload for each accepted file. Resolve the
            promise only after your server confirms the upload. Throw an error to show a retryable
            failure. Report real progress from 0 to 100 with onProgress, or omit it for an
            indeterminate upload. The component does not invent progress or choose an upload
            endpoint.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Pass signal to your request. Removing an active file and unmounting Root abort pending
            requests. Removing a completed item clears it locally; your application owns deleting
            server files. Retry uses the same file with a fresh signal. Rejected file types,
            oversized files, duplicates, and excess files remain visible without a retry action.
            Validate files on your server too.
        </Typography.Text>
        <CodeBlock
            lang="svelte"
            copy="overlay"
            code={`import * as FileUpload from '$lib/mielui/components/file-upload';

<FileUpload.Root
  accept="image/*,.pdf"
  maxSize={10 * 1024 * 1024}
  maxFiles={3}
  onUpload={async (file, { signal }) => {
      const body = new FormData();
      body.append('file', file);
      const response = await fetch('/api/uploads', {
          method: 'POST', body, signal
      });
      if (!response.ok) {
          throw new Error('Upload failed. Try again.');
      }
  }}
/>`}
        />
    </section>
    <section id="composition" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Compose the card</Typography.H2>
        <Typography.Text variant="supporting">
            Root exposes items, total, uploading, and complete through its children snippet. List
            exposes each item. Item provides its state to Preview, Details, Progress, Status, Retry,
            and Remove. The default composition uses these same parts. This example omits the
            preview and puts status above progress.
        </Typography.Text>
        <CodeBlock
            lang="svelte"
            copy="overlay"
            code={`<FileUpload.Root {onUpload}>
  {#snippet children({ complete, total })}
    <FileUpload.Dropzone>
      <p>Drop project files here</p>
      <FileUpload.Trigger>Browse files</FileUpload.Trigger>
    </FileUpload.Dropzone>
    <p>{complete} of {total} uploaded</p>
    <FileUpload.List>
      {#snippet children(item)}
        <FileUpload.Item {item}>
          <div class="min-w-0 flex-1">
            <FileUpload.Details />
            <FileUpload.Status />
            <FileUpload.Progress />
          </div>
          <FileUpload.Retry />
          <FileUpload.Remove />
        </FileUpload.Item>
      {/snippet}
    </FileUpload.List>
  {/snippet}
</FileUpload.Root>`}
        />
    </section>
    <section id="motion" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Motion and accessibility</Typography.H2>
        <Typography.Text variant="supporting">
            The dropzone, file list, progress, and completion state animate in place. Animation
            respects reduced motion and the theme's panel duration. Choose files works with a
            keyboard; status changes are announced, and icon actions include tooltips.
        </Typography.Text>
    </section>
    <section id="retry-and-cancel" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Retry and cancellation</Typography.H2>
        <Typography.Text variant="supporting">
            In the first example, turn on Fail the next upload before choosing a file. Retry keeps
            the original file and starts a new request. Remove cancels a pending upload and removes
            its card. Your upload handler must pass the supplied signal to fetch or abort its own
            transport when the signal fires.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Progress measures bytes sent, not server acceptance. Keep the promise pending until the
            server confirms completion. An image preview stays attached to the same file during
            progress updates and releases its object URL when removed. A rejected oversized image is
            shown as an error without decoding a preview.
        </Typography.Text>
    </section>
    <section id="single-file" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Single file</Typography.H2>
        <Typography.Text variant="supporting">
            Set<code>maxFiles=&#123;1&#125;</code> to accept one file and use a single-file picker.
            Remove the current photo before choosing its replacement. Dropping extra files keeps the
            accepted file and shows why the others were rejected. This example creates a local
            preview only.
        </Typography.Text>
        <ComponentPreview code={SingleSrc}><Single /></ComponentPreview>
    </section>
</div>
