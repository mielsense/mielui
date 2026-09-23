<script lang="ts">
    import { ArrowDown02Icon as ArrowDown } from '@hugeicons/core-free-icons';
    import { getCssDuration } from '@mielui/svelte/transition';
    import { cn, pressable } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { ConversationScrollButtonProps } from '.';
    import { getConversationContext } from './context.svelte';

    let {
        label = 'Scroll to latest message',
        class: className,
        onclick,
        ...rest
    }: ConversationScrollButtonProps = $props();

    const conversation = getConversationContext();
    const visible = $derived(!conversation.follow && !conversation.atBottom);

    function scrollToBottom(button: HTMLButtonElement) {
        const reducedMotion =
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
            getCssDuration(button, '--motion-duration-panel', 180) === 0;
        conversation.scrollToBottom(reducedMotion ? 'auto' : 'smooth');
    }
</script>

<div class="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center px-4">
    <button
        {...rest}
        type="button"
        use:pressable
        data-ui="conversation-scroll-button"
        data-state={visible ? 'visible' : 'hidden'}
        aria-label={label}
        aria-hidden={!visible}
        disabled={!visible}
        tabindex={visible ? undefined : -1}
        class={cn(
            className,
            'mielui-press pointer-events-auto inline-flex size-9 items-center justify-center rounded-full border-[length:var(--border-size)] border-border bg-panel text-foreground shadow-[var(--elevation-control-edge)] transition-[background-color,color,opacity,translate,transform,scale] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] hover:bg-secondary focus-visible:outline-none focus-visible:shadow-[var(--focus-ring),var(--elevation-control-edge)] motion-reduce:translate-y-0 motion-reduce:transition-none',
            visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-1.5 opacity-0'
        )}
        onclick={(event) => {
            onclick?.(event);
            if (!event.defaultPrevented) {
                scrollToBottom(event.currentTarget);
            }
        }}
    >
        <HugeiconsIcon icon={ArrowDown} size={16} strokeWidth={2} aria-hidden="true" />
    </button>
</div>
