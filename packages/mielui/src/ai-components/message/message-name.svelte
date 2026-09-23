<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { MessageNameProps } from '.';
    import { getMessageContext } from './context.svelte';

    let { children, class: className, ...rest }: MessageNameProps = $props();
    const message = getMessageContext();
</script>
<span
    {...rest}
    data-ui="message-name"
    class={cn(className, 'truncate font-[var(--font-weight-label)]')}
>
    {#if children}
        {@render children()}
    {:else}
        {message.name ?? ""}
    {/if}
</span>
