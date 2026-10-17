<script lang="ts">
    import * as FileUpload from '@mielui/svelte/components/file-upload';
    import { Switch } from '@mielui/svelte/components/switch';

    type UploadOptions = Parameters<FileUpload.FileUploadProps['onUpload']>[1];

    let failNext = $state(false);

    async function upload(_file: File, { signal, onProgress }: UploadOptions) {
        const shouldFail = failNext;
        failNext = false;

        await new Promise<void>((resolve, reject) => {
            let progress = 0;

            function cancel() {
                clearInterval(timer);
                reject(new DOMException('Upload cancelled', 'AbortError'));
            }

            const timer = setInterval(() => {
                progress += 10;
                onProgress(progress);

                if (progress < 100) {
                    return;
                }

                clearInterval(timer);
                signal.removeEventListener('abort', cancel);

                if (shouldFail) {
                    reject(new Error('Connection interrupted. Try uploading again.'));
                } else {
                    resolve();
                }
            }, 180);

            signal.addEventListener('abort', cancel, {
                once: true
            });
        });
    }
</script>

<div class="flex w-full max-w-md flex-col gap-4">
    <div class="flex flex-col gap-1">
        <p class="text-sm font-medium">Project files</p>
        <p class="text-sm text-foreground-muted">Images and PDFs. Up to 3 files, 10 MB each.</p>
    </div>
    <FileUpload.Root
        accept="image/*,.pdf"
        maxFiles={3}
        maxSize={10 * 1024 * 1024}
        onUpload={upload}
    />
    <Switch bind:checked={failNext} label="Fail the next upload" />
    <p class="text-xs text-foreground-muted">Demo only. Files stay on your device.</p>
</div>
