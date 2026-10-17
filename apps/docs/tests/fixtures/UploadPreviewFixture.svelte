<script lang="ts">
    import type { FileUploadEntry } from '@mielui/svelte/components/file-upload';
    import { setFileUploadItem } from '@mielui/svelte/components/file-upload/context';
    import Preview from '@mielui/svelte/components/file-upload/file-upload-preview.svelte';

    let { item }: { item: FileUploadEntry } = $props();
    setFileUploadItem(() => item);
</script>

<Preview />
