<script lang="ts">
    import { untrack } from 'svelte';
    import type { DialogFooterProps } from '.';
    import { getDialogContext } from './context.svelte';

    let { class: className, children, ...rest }: DialogFooterProps = $props();
    const dialog = getDialogContext();

    $effect(() => {
        dialog.footerSlot = { children, className, rest };
        const registered = untrack(() => dialog.footerSlot);
        return () => {
            if (dialog.footerSlot === registered) {
                dialog.footerSlot = undefined;
            }
        };
    });
</script>
