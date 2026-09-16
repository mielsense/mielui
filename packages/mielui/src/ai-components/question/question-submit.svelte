<script lang="ts">
    import { ArrowRight02Icon as ArrowRight } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { Spinner } from '@mielui/svelte/components/spinner';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { QuestionSubmitProps } from '.';
    import { getQuestionContext } from './context.svelte';

    let {
        label = 'Submit answer',
        loadingLabel = 'Submitting...',
        children,
        disabled = false,
        class: className,
        element = $bindable(),
        onclick,
        'aria-disabled': ariaDisabled,
        ...rest
    }: QuestionSubmitProps = $props();

    const context = getQuestionContext();
    const submitting = $derived(context.status === 'submitting');
</script>

<Button
    bind:element
    {...rest}
    type="submit"
    variant="primary"
    size="md"
    data-ui="question-submit"
    disabled={context.disabled || disabled}
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
        {loadingLabel}
    {:else if children}
        {@render children()}
    {:else}
        {label}
        <HugeiconsIcon icon={ArrowRight} size={14} strokeWidth={2} aria-hidden="true" />
    {/if}
</Button>
