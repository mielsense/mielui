<script lang="ts">
    import * as Attachment from '@mielui/svelte/components/attachment';

    let files = $state<File[]>([]);
    let rejected = $state<Attachment.AttachmentRejection[]>([]);
</script>

<Attachment.Root
    bind:files
    onReject={(rejections) => {
        rejected = rejections;
    }}
    accept="image/png,image/jpeg,.pdf"
    maxFiles={3}
    maxSize={5 * 1024 * 1024}
    class="mx-auto flex w-full max-w-xl flex-col items-center gap-2"
>
    <Attachment.Trigger variant="outline" size="md">Choose files</Attachment.Trigger>
    <p class="text-sm text-foreground-muted">PNG, JPEG, or PDF. Up to 3 files, 5 MB each.</p>
    <Attachment.List class="self-stretch items-center sm:justify-center" />
    {#each rejected as rejection}
        <Attachment.Item
            file={rejection.file}
            status="error"
            error={rejection.reason}
            class="w-fit max-w-full"
            onRemove={() => {
                rejected = rejected.filter((item) => item !== rejection);
            }}
        />
    {/each}
</Attachment.Root>
