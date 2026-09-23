<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { untrack } from 'svelte';
    import { getDialogContext } from '../../components/dialog/context.svelte';
    import type { CommandHeaderProps } from '.';

    let { class: className, children, ...rest }: CommandHeaderProps = $props();
    const dialog = getDialogContext();

    dialog.headerSlot = untrack(() => ({
        get children() {
            return children;
        },
        className: cn('px-3 pt-1.5 pb-1 text-foreground-muted', className),
        rest
    }));
</script>
