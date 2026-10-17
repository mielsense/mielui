<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import type { AlertDialogProps } from '.';

    let {
        open = $bindable(false),
        onOpenChange,
        error = false,
        children
    }: AlertDialogProps = $props();
</script>

<Dialog.Root bind:open {onOpenChange} {error}> {@render children?.()} </Dialog.Root>
