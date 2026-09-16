<script lang="ts">
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import ChevronDown from '@hugeicons/core-free-icons/ArrowDown01Icon';
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import type { ReasoningTriggerProps } from '.';
    import { getReasoningContext } from './context.svelte';

    let {
        title = 'Draft',
        duration,
        children,
        class: className,
        ...rest
    }: ReasoningTriggerProps = $props();
    const reasoning = getReasoningContext();
</script>

<Button
    {...rest}
    type="button"
    variant="quiet"
    data-ui="reasoning-trigger"
    aria-expanded={reasoning.open}
    aria-controls={`reasoning-${reasoning.id}`}
    onclick={() => (reasoning.open = !reasoning.open)}
    class={cn(
        className,
        "relative flex h-auto max-w-full flex-col items-start justify-start gap-1.5 rounded-none px-0 text-left after:absolute after:-inset-1.5 after:content-['']"
    )}
>
    {#if children}
        {@render children({ open: reasoning.open, streaming: reasoning.streaming })}
    {:else}
        <span class="flex items-center gap-1">
            <span
                class={cn(
                    'font-[var(--font-weight-label)]',
                    reasoning.streaming ? 'mielui-reasoning-shimmer' : 'text-foreground-muted'
                )}
            >
                {reasoning.streaming ? 'Thinking' : 'Thought'}
            </span>
            {#if !reasoning.streaming && duration}
                <span class="text-foreground-muted">for{duration}</span>
            {/if}
            <HugeiconsIcon
                icon={ChevronDown}
                size={14}
                aria-hidden="true"
                class={cn(
                    'shrink-0 text-foreground-muted transition-transform [transition-duration:var(--motion-duration-hover)]',
                    reasoning.open && 'rotate-180'
                )}
            />
        </span>
        {#if !reasoning.open}
            <span class="max-w-full text-pretty">{title}</span>
        {/if}
    {/if}
</Button>

<style>
    .mielui-reasoning-shimmer {
        background: linear-gradient(
            100deg,
            var(--color-foreground-muted) 35%,
            var(--color-foreground) 50%,
            var(--color-foreground-muted) 65%
        );
        background-size: 200% 100%;
        background-clip: text;
        color: transparent;
        animation: mielui-reasoning-shimmer 1.6s linear infinite;
    }

    @keyframes mielui-reasoning-shimmer {
        from {
            background-position: 200% 0;
        }
        to {
            background-position: -200% 0;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .mielui-reasoning-shimmer {
            animation: none;
            background: none;
            color: var(--color-foreground-muted);
        }
    }
</style>
