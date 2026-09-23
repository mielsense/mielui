<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import { cn } from '@mielui/svelte/utils';

    import type { AlertDialogContentProps } from '.';

    let {
        class: className,
        allowEscape = true,
        ariaBusy,
        size = 'sm',
        children,
        ...rest
    }: AlertDialogContentProps = $props();
</script>

<Dialog.Content
    {allowEscape}
    {size}
    allowClickOutside={false}
    showClose={false}
    role="alertdialog"
    panelIdPrefix="alert-dialog"
    data-ui="alert-dialog-content"
    aria-busy={ariaBusy}
    class={cn(className, 'rounded-[var(--radius-xl)]')}
    {...rest}
>
    {@render children?.()}
</Dialog.Content>
