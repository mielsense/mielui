<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { MessageRootProps } from '.';
    import { type MessageContext, setMessageContext } from './context.svelte';
    import Avatar from './message-avatar.svelte';
    import Body from './message-body.svelte';
    import Metadata from './message-metadata.svelte';
    import Name from './message-name.svelte';
    import Status from './message-status.svelte';
    import Time from './message-time.svelte';

    let {
        from = 'assistant',
        status = 'idle',
        name,
        timestamp,
        avatar,
        layout,
        children,
        class: className,
        ...rest
    }: MessageRootProps = $props();

    const message: MessageContext = {
        get name() {
            return name;
        },
        get timestamp() {
            return timestamp;
        },
        get avatar() {
            return avatar;
        },
        get from() {
            return from;
        },
        get status() {
            return status;
        }
    };

    setMessageContext(message);
</script>

<article
    {...rest}
    data-ui="message"
    data-from={from}
    data-state={status}
    aria-busy={status === 'streaming'}
    class={cn(
        className,
        'group/message flex w-full min-w-0 gap-3',
        from === 'user'
            ? 'flex-row-reverse items-start'
            : from === 'system'
              ? 'items-center justify-center'
              : 'items-start'
    )}
>
    {#if layout}
        {@render layout()}
    {:else}
        {#if avatar}
            <Avatar />
        {/if}
        <Body>
            {#if name || timestamp || status === 'error'}
                <Metadata>
                    {#if name}
                        <Name />
                    {/if}
                    {#if timestamp}
                        <Time />
                    {/if}
                    {#if status === 'error'}
                        <Status />
                    {/if}
                </Metadata>
            {/if}
            {@render children?.()}
        </Body>
    {/if}
</article>
