import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLFormAttributes } from 'svelte/elements';
import type { ButtonProps } from '../button';
import Root from './form.svelte';
import Actions from './form-actions.svelte';
import ErrorSummary from './form-error-summary.svelte';
import Status from './form-status.svelte';
import Submit from './form-submit.svelte';

export type FormProps = HTMLFormAttributes & {
    /** Bindable reference to the DOM element. */
    element?: HTMLFormElement | null;
    /** Marks the form as submitting. A number is the count of pending requests. */
    pending?: boolean | number;
};
export type FormActionsProps = HTMLAttributes<HTMLDivElement>;
export type FormStatusProps = HTMLAttributes<HTMLDivElement> & {
    /** Color that carries the meaning. */
    tone?: 'neutral' | 'success' | 'error';
};
export type FormSubmitProps = Omit<Extract<ButtonProps, { href?: undefined }>, 'type' | 'href'>;

export type FormIssue = Readonly<{
    message: string;
    controlId?: string;
    path?: readonly (string | number)[];
}>;
export type FormErrorSummaryProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    /** Validation issues to summarize. */
    issues?: readonly FormIssue[];
    /** Moves focus to the summary when issues appear. */
    focusOnError?: boolean;
    /** Replaces the summary heading. */
    heading?: Snippet;
    /** Content rendered inside. */
    children?: Snippet<[readonly FormIssue[]]>;
    /** Bindable reference to the DOM element. */
    element?: HTMLDivElement;
};

export { Actions, ErrorSummary, Root, Status, Submit };
