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
        'min-w-0 select-text [overflow-wrap:anywhere]',
        message.from === 'user'
            ? 'max-w-full rounded-[var(--radius-xl)] bg-secondary px-3.5 py-2 [font-size:var(--font-size-body)] leading-relaxed [font-weight:var(--font-weight-body)] text-foreground'
            : message.from === 'system'
              ? 'max-w-[65ch] px-3 py-1.5 [font-size:var(--font-size-label)] leading-relaxed text-foreground-muted'
              : 'w-full max-w-[65ch] [font-size:var(--font-size-body)] leading-relaxed [font-weight:var(--font-weight-body)] text-foreground'
    )}
>
    {@render children?.()}
</div>
