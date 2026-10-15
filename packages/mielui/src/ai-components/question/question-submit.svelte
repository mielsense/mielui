<script lang="ts">
    import { ArrowRight02Icon as ArrowRight } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { Spinner } from '@mielui/svelte/components/spinner';
    import { buttonAttributes } from '../../components/_internal/button-attributes';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { QuestionSubmitProps } from '.';
    import { findQuestionLabels, getQuestionContext } from './context.svelte';

    let {
        children,
        disabled = false,
        class: className,
        element = $bindable(),
        onclick,
        'aria-disabled': ariaDisabled,
        ...rest
    }: QuestionSubmitProps = $props();

    const labels = findQuestionLabels();
    const context = getQuestionContext();
    const submitting = $derived(context.status === 'submitting');
</script>

<Button
    bind:element
    {...buttonAttributes(rest)}
    type="submit"
    variant="primary"
    size="md"
    data-ui="question-submit"
    disabled={context.disabled || !!disabled}
    class={className}
    aria-busy={submitting || undefined}
    aria-disabled={submitting || ariaDisabled}
    onclick={(event: MouseEvent) => {
        if (submitting) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        onclick?.(event as Parameters<NonNullable<typeof onclick>>[0]);
    }}
>
    {#if submitting}
        <Spinner size={14} aria-hidden="true" />
        {labels?.()?.submitting ?? 'Submitting...'}
    {:else if children}
        {@render children()}
    {:else}
        {labels?.()?.submit ?? 'Submit answer'}
        <HugeiconsIcon icon={ArrowRight} size={14} strokeWidth={2} aria-hidden="true" />
    {/if}
</Button>
