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
        className: cn(className, 'px-3 py-1.5 text-xs text-foreground-muted'),
        rest
    }));
</script>
