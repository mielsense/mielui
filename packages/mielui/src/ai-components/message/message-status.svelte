<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { MessageStatusProps } from '.';
    import { getMessageContext } from './context.svelte';

    let { children, class: className, ...rest }: MessageStatusProps = $props();
    const message = getMessageContext();
</script>
<span
    {...rest}
    data-ui="message-status"
    class={cn(className, 'inline-flex items-center gap-1', message.status === 'error' && 'text-error')}
>
    {#if children}
        {@render children()}
    {:else if message.status === "error"}
        <span aria-hidden="true">!</span>
        Failed
    {:else if message.status === "streaming"}
        Streaming
    {:else}
        Complete
    {/if}
</span>
