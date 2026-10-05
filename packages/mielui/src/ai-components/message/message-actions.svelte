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
        'mielui-message-actions flex min-h-8 max-w-full flex-wrap items-center gap-1 text-foreground-muted',
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
        .mielui-message-actions:focus-within {
            opacity: 1;
        }
    }
</style>
