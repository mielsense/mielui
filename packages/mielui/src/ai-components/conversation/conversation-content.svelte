<script lang="ts">
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import { cn } from '@mielui/svelte/utils';
    import type { ConversationContentProps } from '.';
    import { getConversationContext } from './context.svelte';

    let {
        children,
        class: className,
        transcriptClass,
        'aria-label': ariaLabel = 'Conversation',
        tabindex,
        onscroll,
        onscrollend,
        onwheel,
        ontouchstart,
        onpointerdown,
        ...rest
    }: ConversationContentProps = $props();

    const conversation = getConversationContext();
    let viewport = $state<HTMLDivElement>();

    $effect(() => {
        if (viewport) {
            return conversation.observeViewport(viewport);
        }
    });
</script>

<!-- Named overflow regions need a focus target for reliable keyboard scrolling. -->
<ScrollArea
    bind:element={viewport}
    showCues={false}
    {...rest}
    data-ui="conversation-content"
    data-state={conversation.follow ? 'following' : 'paused'}
    role="log"
    aria-label={ariaLabel}
    aria-live="polite"
    aria-relevant="additions text"
    tabindex={tabindex ?? (conversation.scrollable ? 0 : undefined)}
    class={cn(
        className,
        'h-full min-h-0 [scrollbar-gutter:stable] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary/50'
    )}
    onscroll={(event) => {
        conversation.handleScroll(event.currentTarget);
        onscroll?.(event);
    }}
    onscrollend={(event) => {
        conversation.finishScroll(event.currentTarget);
        onscrollend?.(event);
    }}
    onwheel={(event) => {
        conversation.markUserIntent();
        onwheel?.(event);
    }}
    ontouchstart={(event) => {
        conversation.markUserIntent();
        ontouchstart?.(event);
    }}
    onpointerdown={(event) => {
        conversation.markUserIntent();
        onpointerdown?.(event);
    }}
>
    <div
        data-ui="conversation-transcript"
        class={cn(
            transcriptClass,
            'mx-auto flex min-h-full w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6'
        )}
    >
        {@render children?.()}
    </div>
</ScrollArea>
