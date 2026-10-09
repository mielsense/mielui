<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
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
            'mielui-press pointer-events-auto inline-flex size-[var(--size-control-sm)] items-center justify-center rounded-[var(--radius-control)] border-[length:var(--border-size)] border-border bg-[var(--color-panel)] text-foreground-muted shadow-[var(--elevation-float)] transition-[background-color,color,box-shadow,opacity,translate,scale] ease-[var(--ease-out),var(--ease-out),var(--ease-out),var(--ease-out),var(--ease-spring-panel),var(--ease-press)] hover:bg-[color-mix(in_srgb,var(--color-foreground)_4%,var(--color-panel))] hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring),var(--elevation-float)] motion-reduce:translate-y-0 motion-reduce:transition-none',
            visible
                ? 'translate-y-0 opacity-100 [transition-duration:var(--motion-duration-hover),var(--motion-duration-hover),var(--motion-duration-hover),var(--motion-duration-hover),var(--motion-duration-spring),var(--motion-duration-press)]'
                : 'pointer-events-none translate-y-1.5 opacity-0 [transition-duration:var(--motion-duration-panel-out)]'
        )}
        onclick={(event) => {
            onclick?.(event);
            if (!event.defaultPrevented) {
                scrollToBottom(event.currentTarget);
            }
        }}
    >
        <span class="mielui-conversation-scroll-glyph grid place-items-center">
            <HugeiconsIcon icon={ChevronDown} size={15} strokeWidth={2} aria-hidden="true" />
        </span>
    </button>
</div>

<style>
    @media (prefers-reduced-motion: no-preference) {
        [data-state='visible'] .mielui-conversation-scroll-glyph {
            animation: mielui-conversation-scroll-bob calc(var(--motion-duration-spring) * 4)
                ease-in-out infinite;
        }
    }

    @keyframes mielui-conversation-scroll-bob {
        50% {
            translate: 0 calc(var(--spacing) * 0.6);
        }
    }
</style>
