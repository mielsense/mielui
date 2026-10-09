<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getContext } from 'svelte';
    import type { MessageActionsProps, MessageLabels } from '.';
    import { getMessageContext } from './context.svelte';

    let {
        children,
        class: className,
        'aria-label': ariaLabel,
        ...rest
    }: MessageActionsProps = $props();
    const labels = getContext<(() => MessageLabels | undefined) | undefined>('message-labels');
    const message = getMessageContext();
</script>

<div
    {...rest}
    data-ui="message-actions"
    data-from={message.from}
    data-state={message.status}
    role="group"
    aria-label={ariaLabel ?? labels?.()?.actions ?? 'Message actions'}
    class={cn(
        className,
        'mielui-message-actions -mx-1.5 flex min-h-[var(--size-control-sm)] max-w-[calc(100%+var(--spacing)*3)] flex-wrap items-center gap-0.5 text-foreground-muted [--size-control-md:var(--size-control-sm)] [--size-icon-md:calc(var(--size-control-sm)-var(--size-hairline))]',
        message.from === 'user'
            ? 'justify-end'
            : message.from === 'system'
              ? 'justify-center'
              : 'justify-start'
    )}
>
    {@render children?.()}
</div>

<style>
    @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
        .mielui-message-actions {
            opacity: 0;
            transition-property: opacity;
            transition-duration: var(--motion-duration-hover);
            transition-timing-function: var(--ease-out);
        }

        :global([data-ui='message']:hover) .mielui-message-actions,
        :global([data-ui='message'][data-state='error']) .mielui-message-actions,
        .mielui-message-actions:focus-within {
            opacity: 1;
        }
    }
</style>
