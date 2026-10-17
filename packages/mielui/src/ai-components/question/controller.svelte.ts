import { untrack } from 'svelte';
import { createSubmission } from '../../components/_internal/submission.svelte';
import type { QuestionAnswer, QuestionProps, QuestionStatus, QuestionType } from '.';
import type { QuestionContext } from './context';

type ControllerOptions = {
    readonly type: QuestionType;
    value: QuestionAnswer | undefined;
    readonly status: QuestionStatus;
    readonly disabled: boolean;
    readonly required: boolean;
    readonly autofocus: boolean;
    readonly name: string;
    readonly errorMessage: string;
    readonly labels: QuestionProps['labels'];
    readonly form: HTMLFormElement | undefined;
    readonly onSubmit: QuestionProps['onSubmit'];
    readonly onError: QuestionProps['onError'];
    readonly onCancel: QuestionProps['onCancel'];
};

type SubmitHandler<Answer> = (answer: Answer, event: SubmitEvent) => void | Promise<void>;

function normalizeAnswer(
    questionType: QuestionType,
    currentValue: QuestionAnswer | undefined
): QuestionAnswer {
    if (questionType === 'multiple') {
        return Array.isArray(currentValue) ? currentValue : [];
    }

    return typeof currentValue === 'string' ? currentValue : '';
}

function getValidationMessage(questionType: QuestionType, labels: QuestionProps['labels']) {
    if (questionType === 'multiple') {
        return labels?.selectAnswers ?? 'Select at least one answer.';
    }

    if (questionType === 'text') {
        return labels?.enterAnswer ?? 'Enter an answer.';
    }

    return labels?.selectAnswer ?? 'Select an answer.';
}

export function createQuestionController(options: ControllerOptions) {
    const initialType = untrack(() => options.type);
    options.value = normalizeAnswer(initialType, options.value);

    const submission = createSubmission();
    const pending = $derived(submission.pending);
    let validationAttempt = $state<{ type: QuestionType }>();
    let focused = false;
    let previousType = initialType;

    const effectiveStatus = $derived.by<QuestionStatus>(() => {
        if (options.status === 'submitting' || pending) {
            return 'submitting';
        }

        if (submission.failed) {
            return 'error';
        }

        return options.status;
    });
    const answer = $derived.by<QuestionAnswer>(() => normalizeAnswer(options.type, options.value));
    const hasAnswer = $derived(
        Array.isArray(answer) ? answer.length > 0 : answer.trim().length > 0
    );
    const validationMessage = $derived(
        validationAttempt?.type === options.type && options.required && !hasAnswer
            ? getValidationMessage(options.type, options.labels)
            : ''
    );
    const displayStatus = $derived<QuestionStatus>(
        effectiveStatus === 'error' || validationMessage ? 'error' : effectiveStatus
    );
    const displayErrorMessage = $derived(validationMessage || options.errorMessage);
    const interactiveDisabled = $derived(options.disabled || effectiveStatus === 'submitting');

    const context: QuestionContext = {
        get type() {
            return options.type;
        },
        get answer() {
            return answer;
        },
        get status() {
            return effectiveStatus;
        },
        get disabled() {
            return options.disabled;
        },
        get busy() {
            return effectiveStatus === 'submitting';
        },
        get required() {
            return options.required;
        },
        get canSubmit() {
            return !options.required || hasAnswer;
        },
        get validationMessage() {
            return validationMessage;
        },
        get name() {
            return options.name;
        },
        isSelected(optionValue: string) {
            return Array.isArray(answer) ? answer.includes(optionValue) : answer === optionValue;
        },
        select(optionValue: string) {
            if (options.disabled || effectiveStatus === 'submitting' || options.type === 'text') {
                return;
            }

            if (options.type === 'multiple') {
                const selected = Array.isArray(answer) ? answer : [];
                options.value = selected.includes(optionValue)
                    ? selected.filter((item) => item !== optionValue)
                    : [...selected, optionValue];
                validationAttempt = undefined;
                return;
            }

            options.value = optionValue;
            validationAttempt = undefined;
        },
        setText(nextValue: string) {
            if (!options.disabled && effectiveStatus !== 'submitting' && options.type === 'text') {
                options.value = nextValue;
                validationAttempt = undefined;
            }
        },
        submit() {
            if (!options.disabled && effectiveStatus !== 'submitting') {
                options.form?.requestSubmit();
            }
        },
        cancel(event: MouseEvent) {
            if (!options.disabled && effectiveStatus !== 'submitting') {
                options.onCancel?.(event);
            }
        }
    };

    $effect.pre(() => {
        if (options.type !== previousType) {
            previousType = options.type;
            validationAttempt = undefined;
            submission.reset();
            options.value = options.type === 'multiple' ? [] : '';
            focused = false;
            return;
        }

        if (options.type === 'multiple' && !Array.isArray(options.value)) {
            options.value = [];
        } else if (options.type !== 'multiple' && typeof options.value !== 'string') {
            options.value = '';
        }
    });

    $effect(() => {
        options.type;
        if (!options.autofocus) {
            focused = false;
            return;
        }

        const form = options.form;
        if (!form || focused || interactiveDisabled) {
            return;
        }

        let observer: MutationObserver | undefined;
        const focusFirstControl = () => {
            const control = options.form?.querySelector<HTMLElement>(
                '[data-question-control]:not(:disabled)'
            );
            control?.focus();
            focused = document.activeElement === control;
            if (focused) {
                observer?.disconnect();
            }
        };

        focusFirstControl();
        if (focused) {
            return;
        }

        observer = new MutationObserver(focusFirstControl);
        observer.observe(form, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['disabled']
        });

        return () => observer.disconnect();
    });

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        if (context.disabled || context.busy) {
            return;
        }

        if (!context.canSubmit) {
            validationAttempt = {
                type: options.type
            };
            queueMicrotask(() => {
                options.form
                    ?.querySelector<HTMLElement>('[data-question-control]:not(:disabled)')
                    ?.focus();
            });
            return;
        }

        validationAttempt = undefined;
        const submittedAnswer = context.answer;
        await submission.run(() => {
            if (options.type === 'multiple') {
                const submitMultiple = options.onSubmit as SubmitHandler<string[]>;

                return submitMultiple(Array.isArray(submittedAnswer) ? submittedAnswer : [], event);
            }

            const submitSingle = options.onSubmit as SubmitHandler<string>;

            return submitSingle(typeof submittedAnswer === 'string' ? submittedAnswer : '', event);
        }, options.onError);
    }

    function handleKeydown(event: KeyboardEvent & { currentTarget: HTMLFormElement }) {
        const index = Number(event.key);
        const target = event.target;
        const typing =
            target instanceof HTMLTextAreaElement ||
            (target instanceof HTMLInputElement && target.dataset.ui !== 'question-option-input');
        if (
            event.defaultPrevented ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey ||
            typing ||
            !Number.isInteger(index) ||
            index < 1
        ) {
            return;
        }
        const control = event.currentTarget.querySelectorAll<HTMLInputElement>(
            '[data-ui="question-option-input"]'
        )[index - 1];
        if (!control || control.disabled) {
            return;
        }
        event.preventDefault();
        control.focus();
        control.click();
    }

    return {
        context,
        get effectiveStatus() {
            return effectiveStatus;
        },
        get displayStatus() {
            return displayStatus;
        },
        get displayErrorMessage() {
            return displayErrorMessage;
        },
        get validationMessage() {
            return validationMessage;
        },
        handleSubmit,
        handleKeydown
    };
}
