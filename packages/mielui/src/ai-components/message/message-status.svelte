<script lang="ts">
    import { AlertCircleIcon as CircleAlert } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { MessageStatusProps } from '.';
    import { getMessageContext } from './context.svelte';

    let { children, class: className, ...rest }: MessageStatusProps = $props();
    const message = getMessageContext();
</script>

<span
    {...rest}
    data-ui="message-status"
    class={cn(
        className,
        'inline-flex items-center gap-1',
        message.status === 'error' && 'text-[var(--mielui-error-text)]'
    )}
>
    {#if children}
        {@render children()}
    {:else if message.status === 'error'}
        <HugeiconsIcon
            icon={CircleAlert}
            size={12}
            strokeWidth={2}
            aria-hidden="true"
            class="shrink-0"
        />
        Failed
    {:else if message.status === 'streaming'}
        Streaming
    {:else}
        Complete
    {/if}
</span>
