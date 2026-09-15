<script lang="ts">
    import { untrack } from 'svelte';
    import type { DialogFooterProps } from '.';
    import { getDialogContext } from './context.svelte';

    let { class: className, children, ...rest }: DialogFooterProps = $props();
    const dialog = getDialogContext();

    dialog.footerSlot = untrack(() => ({
        children,
        className,
        rest
    }));
</script>
