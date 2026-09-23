import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLFormAttributes } from 'svelte/elements';
import type { ButtonProps } from '../button';
import Root from './form.svelte';
import Actions from './form-actions.svelte';
import ErrorSummary from './form-error-summary.svelte';
import Status from './form-status.svelte';
import Submit from './form-submit.svelte';

export type FormProps = HTMLFormAttributes & {
    element?: HTMLFormElement | null;
    pending?: boolean | number;
};
export type FormActionsProps = HTMLAttributes<HTMLDivElement>;
export type FormStatusProps = HTMLAttributes<HTMLDivElement> & {
    tone?: 'neutral' | 'success' | 'error';
};
export type FormSubmitProps = Omit<Extract<ButtonProps, { href?: undefined }>, 'type' | 'href'>;

export type FormIssue = Readonly<{
    message: string;
    controlId?: string;
    path?: readonly (string | number)[];
}>;
export type FormErrorSummaryProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    issues?: readonly FormIssue[];
    focusOnError?: boolean;
    heading?: Snippet;
    children?: Snippet<[readonly FormIssue[]]>;
    element?: HTMLDivElement;
};

export { Actions, ErrorSummary, Root, Status, Submit };
