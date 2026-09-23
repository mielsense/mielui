<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { MessageBodyProps } from '.';
    import { getMessageContext } from './context.svelte';

    let { children, class: className, ...rest }: MessageBodyProps = $props();
    const message = getMessageContext();
</script>
<div
    {...rest}
    data-ui="message-body"
    class={cn(className, 'flex min-w-0 max-w-full flex-col gap-1.5', message.from === 'user' ? 'max-w-[90%] items-end sm:max-w-2xl' : message.from === 'system' ? 'w-full max-w-3xl items-center text-center' : 'flex-1 items-start')}
>
    {@render children?.()}
</div>
