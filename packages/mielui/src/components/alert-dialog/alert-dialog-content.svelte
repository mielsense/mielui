<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import { cn, type DefaultProps } from '@mielui/svelte/utils';

    type Props = {
        allowEscape?: boolean;
        ariaBusy?: boolean;
        /** Max-width preset. Defaults to `sm`. */
        size?: 'sm' | 'md' | 'lg' | 'xl';
    } & DefaultProps;

    let {
        class: className,
        allowEscape = true,
        ariaBusy,
        size = 'sm',
        children,
        ...rest
    }: Props = $props();
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
