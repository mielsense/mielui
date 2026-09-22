<script lang="ts">
    import { ArrowUp02Icon, SquareIcon as Square } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { Spinner } from '@mielui/svelte/components/spinner';
    import { cn } from '@mielui/svelte/utils';
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

    function handleClick(event: MouseEvent) {
        onclick?.(event);
        if (!event.defaultPrevented && action === 'stop') {
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
    class={cn(className, 'size-9 shrink-0 rounded-full p-0')}
>
    {#if children}
        {@render children({ action, generating: context.generating ?? false, empty })}
    {:else if isPending}
        <Spinner size={16} aria-hidden="true" />
    {:else if action === 'stop'}
        <HugeiconsIcon icon={Square} size={8} fill="currentColor" aria-hidden="true" />
    {:else}
        <HugeiconsIcon icon={ArrowUp02Icon} size={16} aria-hidden="true" />
    {/if}
</Button>
