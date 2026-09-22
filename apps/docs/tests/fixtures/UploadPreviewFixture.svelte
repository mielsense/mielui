<script lang="ts">
    import type { FileUploadEntry } from '@mielui/svelte/components/file-upload';
    import { setItem } from '@mielui/svelte/components/file-upload/context.svelte';
    import Preview from '@mielui/svelte/components/file-upload/file-upload-preview.svelte';

    let { item }: { item: FileUploadEntry } = $props();
    setItem(() => item);
</script>

<Preview />
