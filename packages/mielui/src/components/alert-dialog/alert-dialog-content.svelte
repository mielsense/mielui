<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import { getDialogContext } from '../dialog/context';
    import type { AlertDialogContentProps } from '.';

    let {
        class: className,
        allowEscape = true,
        ariaBusy,
        size = 'xs',
        children,
        ...rest
    }: AlertDialogContentProps = $props();

    getDialogContext().role = 'alertdialog';
</script>

<Dialog.Content
    {allowEscape}
    {size}
    allowClickOutside={false}
    showClose={false}
    data-ui="alert-dialog-content"
    aria-busy={ariaBusy}
    class={className}
    {...rest}
>
    {@render children?.()}
</Dialog.Content>
