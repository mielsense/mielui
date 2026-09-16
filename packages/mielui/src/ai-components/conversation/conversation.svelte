<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { ConversationRootProps } from '.';
    import { setConversationContext } from './context.svelte';
    import { createConversationFollow } from './follow.svelte';

    let {
        follow = $bindable(true),
        threshold = 80,
        children,
        class: className,
        ...rest
    }: ConversationRootProps = $props();

    const conversation = createConversationFollow({
        get follow() {
            return follow;
        },
        set follow(value) {
            follow = value;
        },
        get threshold() {
            return threshold;
        }
    });
    setConversationContext(conversation);
</script>

<div
    {...rest}
    data-ui="conversation"
    data-state={follow ? 'following' : 'paused'}
    class={cn(className, 'relative min-h-0 overflow-hidden')}
>
    {@render children?.()}
</div>
