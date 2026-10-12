<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { MessageActionsProps } from '.';
    import { findMessageLabels, getMessageContext } from './context.svelte';

    let {
        children,
        class: className,
        'aria-label': ariaLabel,
        ...rest
    }: MessageActionsProps = $props();
    const labels = findMessageLabels();
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
        '[@media(hover:hover)]:pointer-fine:motion-safe:opacity-0 [@media(hover:hover)]:pointer-fine:motion-safe:[transition-property:opacity] [@media(hover:hover)]:pointer-fine:motion-safe:[transition-duration:var(--motion-duration-hover)] [@media(hover:hover)]:pointer-fine:motion-safe:[transition-timing-function:var(--ease-out)] pointer-fine:motion-safe:group-hover/message:opacity-100 [@media(hover:hover)]:pointer-fine:motion-safe:group-data-[state=error]/message:opacity-100 [@media(hover:hover)]:pointer-fine:motion-safe:focus-within:opacity-100',
        message.from === 'user'
            ? 'justify-end'
            : message.from === 'system'
              ? 'justify-center'
              : 'justify-start'
    )}
>
    {@render children?.()}
</div>
