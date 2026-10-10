<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { untrack } from 'svelte';
    import { getDialogContext } from '../../components/dialog/context.svelte';
    import type { CommandHeaderProps } from '.';

    let { class: className, children, ...rest }: CommandHeaderProps = $props();
    const dialog = getDialogContext();

    $effect(() => {
        dialog.headerSlot = {
            children,
            className: cn(className, 'px-3 pt-1.5 pb-1 text-foreground-muted'),
            rest
        };
        const registered = untrack(() => dialog.headerSlot);
        return () => {
            if (dialog.headerSlot === registered) {
                dialog.headerSlot = undefined;
            }
        };
    });
</script>
