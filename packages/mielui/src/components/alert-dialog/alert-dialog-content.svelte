<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';

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
    class={className}
    {...rest}
>
    {@render children?.()}
</Dialog.Content>
