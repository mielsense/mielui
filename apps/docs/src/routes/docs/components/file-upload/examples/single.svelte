<script lang="ts">
    import * as FileUpload from '@mielui/svelte/components/file-upload';

    async function prepare(
        _file: File,
        { signal }: Parameters<FileUpload.FileUploadProps['onUpload']>[1]
    ) {
        signal.throwIfAborted();
        await Promise.resolve();
    }
</script>

<FileUpload.Root
    accept="image/png,image/jpeg,image/webp"
    maxFiles={1}
    maxSize={5 * 1024 * 1024}
    onUpload={prepare}
    class="w-full max-w-md"
>
    {#snippet children({ items })}
        {#if items.length === 0}
            <FileUpload.Dropzone>
                <p class="text-sm font-medium">Profile photo</p>
                <p class="text-sm text-foreground-muted">One PNG, JPEG, or WebP, up to 5 MB.</p>
                <FileUpload.Trigger variant="outline">Choose photo</FileUpload.Trigger>
            </FileUpload.Dropzone>
        {:else}
            <FileUpload.List>
                {#snippet children(item)}
                    <FileUpload.Item {item}>
                        <FileUpload.Preview />
                        <div class="min-w-0 flex-1 space-y-2">
                            <FileUpload.Details />
                            <FileUpload.Status>
                                {item.status === 'error' ? item.error : item.status === 'complete' ? 'Ready on this device' : 'Preparing photo…'}
                            </FileUpload.Status>
                        </div>
                        <FileUpload.Remove size="sm" variant="ghost">Remove</FileUpload.Remove>
                    </FileUpload.Item>
                {/snippet}
            </FileUpload.List>
            <p class="text-xs text-foreground-muted">Remove the photo to choose a replacement.</p>
        {/if}
        <p class="text-xs text-foreground-muted">
            Local preview only. This example does not upload your file.
        </p>
    {/snippet}
</FileUpload.Root>
