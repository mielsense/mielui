<script lang="ts">
    import { AlertCircleIcon as CircleAlert } from '@hugeicons/core-free-icons';
    import * as Card from '@mielui/svelte/components/card';
    import { cn } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { QuestionProps } from '.';
    import { setQuestionContext, setQuestionLabels } from './context.svelte';
    import { createQuestionState } from './state.svelte';

    let {
        variant = 'default',
        type = 'single',
        value = $bindable(),
        status = 'idle',
        disabled = false,
        required = true,
        autofocus = false,
        name = 'answer',
        labels,
        onSubmit,
        onError,
        onCancel,
        class: className,
        children,
        ...rest
    }: QuestionProps = $props();
    setQuestionLabels(() => labels);

    let form: HTMLFormElement | undefined;

    const question = createQuestionState({
        get type() {
            return type;
        },
        get value() {
            return value;
        },
        set value(next) {
            value = next;
        },
        get status() {
            return status;
        },
        get disabled() {
            return disabled;
        },
        get required() {
            return required;
        },
        get autofocus() {
            return autofocus;
        },
        get name() {
            return name;
        },
        get errorMessage() {
            return labels?.submitError ?? 'Answer could not be submitted.';
        },
        get labels() {
            return labels;
        },
        get form() {
            return form;
        },
        get onSubmit() {
            return onSubmit;
        },
        get onError() {
            return onError;
        },
        get onCancel() {
            return onCancel;
        }
    });

    setQuestionContext(question.context);
</script>

<div
    data-ui="question"
    data-type={type}
    data-variant={variant}
    data-state={question.displayStatus}
    data-disabled={disabled || undefined}
    aria-busy={question.effectiveStatus === 'submitting'}
    class="w-full"
>
    <div
        data-state={question.displayStatus}
        class="max-h-0 overflow-hidden transition-[max-height] [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] motion-reduce:transition-none data-[state=error]:max-h-24"
    >
        <div
            data-ui="question-error"
            role={question.effectiveStatus === 'error' && !question.validationMessage
                ? 'alert'
                : undefined}
            aria-hidden={question.displayStatus !== 'error'}
            class="mielui-error-notice text-[var(--mielui-error-text)]"
            data-state={question.displayStatus}
        >
            <HugeiconsIcon icon={CircleAlert} size={14} strokeWidth={2} aria-hidden="true" />
            <span>{question.displayErrorMessage}</span>
        </div>
    </div>

    <form
        bind:this={form}
        {...rest}
        data-ui="question-form"
        data-type={type}
        data-state={question.displayStatus}
        data-disabled={disabled || undefined}
        aria-busy={question.effectiveStatus === 'submitting'}
        novalidate
        onsubmit={question.handleSubmit}
        onkeydown={question.handleKeydown}
        class={cn(className, 'relative w-full min-w-0 text-foreground')}
    >
        <p
            data-ui="question-validation-announcement"
            role="status"
            aria-live="polite"
            class="sr-only"
        >
            {question.validationMessage}
        </p>
        <fieldset {disabled} class="m-0 min-w-0 border-0 p-0">
            <Card.Root
                {variant}
                data-state={question.displayStatus}
                class={cn(
                    variant === 'default' && 'p-0',
                    'w-full transition-[border-color,box-shadow] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-out)] motion-reduce:transition-none data-[state=error]:border-[color-mix(in_srgb,var(--color-error)_70%,transparent)] [&>[data-ui=card-surface]]:p-0'
                )}
            >
                <fieldset class="m-0 flex min-w-0 flex-col border-0 p-0">
                    {@render children?.()}
                </fieldset>
            </Card.Root>
        </fieldset>
    </form>
</div>
