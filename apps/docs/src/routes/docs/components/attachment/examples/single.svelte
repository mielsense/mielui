<script lang="ts">
    import * as Attachment from '@mielui/svelte/components/attachment';

    let files = $state<File[]>([]);
</script>

<Attachment.Root
    bind:files
    multiple={false}
    maxFiles={1}
    class="flex w-full max-w-sm flex-col gap-3"
>
    <div class="flex items-center gap-3">
        <Attachment.Trigger variant="outline" />
        <span class="text-sm text-foreground-muted">
            {files.length === 0 ? 'No file chosen' : 'One file attached'}
        </span>
    </div>
    <Attachment.List variant="chip" label="Attached file" />
</Attachment.Root>
