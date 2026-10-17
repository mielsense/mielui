<script lang="ts">
    import { BubbleChatIcon as MessageCircle } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { ConversationEmptyProps } from '.';
    import { findConversationLabels } from './context';

    let {
        icon,
        title,
        description,
        action,
        children,
        class: className,
        ...rest
    }: ConversationEmptyProps = $props();

    const labels = findConversationLabels();
    const heading = $derived(title ?? labels?.()?.emptyTitle ?? 'Start a conversation');
    const text = $derived(
        description ??
            labels?.()?.emptyDescription ??
            'Ask a question or share what you are working on.'
    );
</script>

<div
    {...rest}
    data-ui="conversation-empty"
    data-state="empty"
    class={cn(className, 'grid min-h-48 w-full place-items-center px-6 py-10 text-center')}
>
    {#if children}
        {@render children()}
    {:else}
        <div class="flex max-w-sm flex-col items-center">
            <div class="mb-3 flex items-center justify-center text-foreground-muted">
                {#if icon}
                    {@render icon()}
                {:else}
                    <HugeiconsIcon
                        icon={MessageCircle}
                        size={20}
                        strokeWidth={1.75}
                        aria-hidden="true"
                    />
                {/if}
            </div>
            {#if heading}
                <p
                    class="[font-size:var(--font-size-body)] [font-weight:var(--font-weight-label)] text-foreground"
                >
                    {heading}
                </p>
            {/if}
            {#if text}
                <p class="mt-1 max-w-xs text-sm leading-body text-foreground-muted">
                    {text}
                </p>
            {/if}
            {#if action}
                <div class="mt-4">{@render action()}</div>
            {/if}
        </div>
    {/if}
</div>
