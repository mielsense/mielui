<script lang="ts">
    import * as Modal from '@mielui/svelte/components/modal';
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

<Modal.Content
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
</Modal.Content>
