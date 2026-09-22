<script lang="ts">
    import * as FileUpload from '@mielui/svelte/components/file-upload';

    async function upload(
        _file: File,
        { signal }: Parameters<FileUpload.FileUploadProps['onUpload']>[1]
    ) {
        signal.throwIfAborted();
        await Promise.resolve();
    }
</script>
<FileUpload.Root
    accept=".pdf"
    maxFiles={1}
    maxSize={5 * 1024 * 1024}
    onUpload={upload}
    class="w-full max-w-sm"
>
    {#snippet children({ complete })}
        <FileUpload.Dropzone class="items-start text-left">
            <p class="text-sm font-medium">Attach an invoice</p>
            <p class="text-sm text-foreground-muted">One PDF, up to 5 MB. Local demo only.</p>
            <FileUpload.Trigger variant="outline">Choose PDF</FileUpload.Trigger>
        </FileUpload.Dropzone>
        <FileUpload.List>
            {#snippet children(item)}
                <FileUpload.Item {item}>
                    <div class="min-w-0 flex-1 space-y-2">
                        <FileUpload.Details />
                        <FileUpload.Status />
                    </div>
                    <FileUpload.Remove />
                </FileUpload.Item>
            {/snippet}
        </FileUpload.List>
        <p class="text-xs text-foreground-muted">
            {complete ? 'Invoice ready.' : 'No invoice uploaded.'}
        </p>
    {/snippet}
</FileUpload.Root>
