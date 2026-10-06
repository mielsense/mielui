<script lang="ts">
    import * as FileUpload from '@mielui/svelte/components/file-upload';
    import { Switch } from '@mielui/svelte/components/switch';

    let locked = $state(true);

    async function keepLocal() {
        await new Promise((resolve) => setTimeout(resolve, 600));
    }
</script>

<div class="flex w-full max-w-md flex-col gap-4">
    <Switch bind:checked={locked} label="Lock uploads" />
    <FileUpload.Root disabled={locked} maxFiles={3} onUpload={keepLocal} class="w-full">
        <FileUpload.Dropzone>
            <p class="text-sm font-medium">Attachments</p>
            <p class="text-sm text-foreground-muted">
                {locked ? 'Uploads are locked.' : 'Drop files here or choose them.'}
            </p>
            <FileUpload.Trigger variant="outline" size="sm">Choose files</FileUpload.Trigger>
        </FileUpload.Dropzone>
    </FileUpload.Root>
</div>
