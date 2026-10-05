<script lang="ts">
    import { AlertCircleIcon as CircleAlert } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import { getContext } from 'svelte';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { MessageLabels, MessageStatusProps } from '.';
    import { getMessageContext } from './context.svelte';

    let { children, class: className, ...rest }: MessageStatusProps = $props();
    const labels = getContext<(() => MessageLabels | undefined) | undefined>('message-labels');
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
        {labels?.()?.failed ?? 'Failed'}
    {:else if message.status === 'streaming'}
        {labels?.()?.streaming ?? 'Streaming'}
    {:else}
        {labels?.()?.complete ?? 'Complete'}
    {/if}
</span>
