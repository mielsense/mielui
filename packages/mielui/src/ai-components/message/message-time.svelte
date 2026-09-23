<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { MessageTimeProps } from '.';
    import { getMessageContext } from './context.svelte';

    let { children, class: className, ...rest }: MessageTimeProps = $props();
    const message = getMessageContext();
</script>
<time {...rest} data-ui="message-time" class={cn(className, 'shrink-0 tabular-nums')}>
    {#if children}
        {@render children()}
    {:else}
        {message.timestamp ?? ""}
    {/if}
</time>
