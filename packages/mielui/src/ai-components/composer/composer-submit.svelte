<script lang="ts">
    import { ArrowUp02Icon, SquareIcon as Square } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { Spinner } from '@mielui/svelte/components/spinner';
    import { getCssDuration, springEase } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import type { TransitionConfig } from 'svelte/transition';
    import { buttonAttributes } from '../../components/_internal/button-attributes';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { ComposerSubmitProps } from '.';
    import { getComposerContext } from './context.svelte';

    let {
        label = 'Send',
        queueLabel = 'Queue message',
        stopLabel = 'Stop response',
        loadingLabel = 'Sending',
        children,
        element = $bindable(),
        disabled = false,
        class: className,
        onclick,
        ...rest
    }: ComposerSubmitProps = $props();

    const flickSpring = springEase(900, 50);
    const stopClasses =
        '[--mielui-glow-color:var(--color-secondary)] [--mielui-glow-light:0.55] [--mielui-glow-ring:var(--color-border)] dark:[--mielui-glow-light:0.1] text-[var(--color-button-foreground)]';

    const context = getComposerContext();
    const empty = $derived(context.value.trim() === '');
    const action = $derived.by(() => {
        if (context.pending) {
            return 'pending';
        }
        if (context.generating === undefined && context.status === 'submitting') {
            return 'stop';
        }
        if (context.generating) {
            return empty ? 'stop' : 'queue';
        }
        return 'send';
    });
    const isPending = $derived(action === 'pending');
    const glyph = $derived(isPending ? 'pending' : action === 'stop' ? 'stop' : 'send');
    const isDisabled = $derived(
        context.disabled || disabled || (action === 'send' && !context.allowEmpty && empty)
    );
    const actionLabel = $derived(
        action === 'stop'
            ? stopLabel
            : action === 'queue'
              ? queueLabel
              : isPending
                ? loadingLabel
                : label
    );

    function glyphIn(node: Element): TransitionConfig {
        return {
            duration: getCssDuration(node, '--motion-duration-flick', 270),
            css: (t) => {
                const scale = 0.9 + 0.1 * flickSpring(t);
                const opacity = Math.min(t * 2.2, 1);

                return `opacity:${opacity};transform:scale(${scale})`;
            }
        };
    }

    function handleClick(event: MouseEvent) {
        onclick?.(event);
        if (!event.defaultPrevented && action === 'stop') {
            event.preventDefault();
            context.stop();
        }
    }
</script>

<Button
    bind:element
    {...buttonAttributes(rest)}
    type={action === 'stop' || isPending ? 'button' : 'submit'}
    variant="primary"
    data-ui="composer-submit"
    data-state={action}
    disabled={isDisabled || isPending}
    aria-busy={isPending}
    aria-label={actionLabel}
    onclick={handleClick}
    class={cn(
        className,
        action === 'stop' && stopClasses,
        'ms-auto size-[var(--size-icon-md)] shrink-0 p-0'
    )}
>
    {#if children}
        {@render children({ action, generating: context.generating ?? false, empty })}
    {:else}
        {#key glyph}
            <span in:glyphIn class="grid place-items-center">
                {#if glyph === 'pending'}
                    <Spinner size={16} aria-hidden="true" />
                {:else if glyph === 'stop'}
                    <HugeiconsIcon icon={Square} size={9} fill="currentColor" aria-hidden="true" />
                {:else}
                    <HugeiconsIcon
                        icon={ArrowUp02Icon}
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                {/if}
            </span>
        {/key}
    {/if}
</Button>
