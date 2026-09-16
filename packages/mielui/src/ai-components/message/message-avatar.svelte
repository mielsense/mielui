<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { MessageAvatarProps } from '.';
    import { getMessageContext } from './context.svelte';

    let { children, class: className, ...rest }: MessageAvatarProps = $props();
    const message = getMessageContext();
</script>
<div {...rest} data-ui="message-avatar" class={cn(className, 'mt-0.5 shrink-0')}>
    {#if children}
        {@render children()}
    {:else}
        {@render message.avatar?.()}
    {/if}
</div>
