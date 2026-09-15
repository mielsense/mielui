<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import type { AlertDialogProps } from '.';

    let {
        open = $bindable(false),
        onOpenChange,
        error = false,
        orientation = 'vertical',
        children
    }: AlertDialogProps = $props();
</script>

<Dialog.Root bind:open {onOpenChange} {error} {orientation}> {@render children?.()} </Dialog.Root>
