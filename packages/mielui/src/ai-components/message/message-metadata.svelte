<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { metadataClasses } from '../../components/typography/variants';
    import type { MessageMetadataProps } from '.';
    import { getMessageContext } from './context.svelte';

    let { children, class: className, ...rest }: MessageMetadataProps = $props();
    const message = getMessageContext();
</script>
<header
    {...rest}
    data-ui="message-metadata"
    class={cn(className, 'flex max-w-full flex-wrap items-center gap-x-2 gap-y-0.5 px-0.5', metadataClasses, message.from === 'user' && 'justify-end', message.from === 'system' && 'justify-center')}
>
    {@render children?.()}
</header>
