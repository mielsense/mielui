<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { MessageContentProps } from '.';
    import { getMessageContext } from './context.svelte';

    let { children, class: className, ...rest }: MessageContentProps = $props();
    const message = getMessageContext();
</script>

<div
    {...rest}
    data-ui="message-content"
    data-from={message.from}
    data-state={message.status}
    class={cn(
        className,
        'min-w-0 max-w-full select-text [overflow-wrap:anywhere]',
        message.from === 'user'
            ? 'rounded-[var(--radius-lg)] bg-secondary/70 px-3 py-1.5 text-sm leading-body [font-weight:var(--font-weight-body)] text-foreground dark:bg-foreground/[0.1]'
            : message.from === 'system'
              ? 'max-w-[65ch] px-3 py-1.5 text-sm leading-body text-foreground-muted'
              : 'w-full max-w-[65ch] leading-body [font-weight:var(--font-weight-body)] text-foreground'
    )}
>
    {@render children?.()}
</div>
