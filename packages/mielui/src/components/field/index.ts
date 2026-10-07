import type { Snippet } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import type { HTMLAttributes, HTMLLabelAttributes } from 'svelte/elements';
import Root from './field.svelte';
import Content from './field-content.svelte';
import Control from './field-control.svelte';
import Description from './field-description.svelte';
import FieldError from './field-error.svelte';
import Group from './field-group.svelte';
import Label from './field-label.svelte';

export type FieldIssue = Readonly<{ message: string }>;

export type FieldControlAttributes = {
    id: string;
    disabled: boolean | undefined;
    required: boolean | undefined;
    'aria-invalid': 'true' | undefined;
    'aria-describedby'?: string;
    [attachment: symbol]: Attachment<HTMLElement>;
};

export type FieldProps = {
    /** Id shared by the label and the control. */
    controlId?: string;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Requires a value before the form can be submitted. */
    required?: boolean;
    /** Marks the field invalid. It defaults to true when there are issues. */
    invalid?: boolean;
    /** Validation issues for this field. */
    issues?: readonly FieldIssue[];
    /** `vertical` stacks the label and control. `horizontal` puts them side by side. */
    orientation?: 'vertical' | 'horizontal';
    /** Bindable reference to the DOM element. */
    element?: HTMLDivElement;
} & HTMLAttributes<HTMLDivElement>;

export type FieldControlProps = {
    /** Ids of the description and error, for `aria-describedby`. */
    describedBy?: string;
    /** Id of the error element. */
    errorId?: string;
    /** Content rendered inside. */
    children: Snippet<[FieldControlAttributes]>;
};

export type FieldLabelProps = HTMLLabelAttributes;
export type FieldDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type FieldErrorProps = {
    /** Validation issues to list. Defaults to the Root's issues. */
    issues?: readonly FieldIssue[];
} & HTMLAttributes<HTMLDivElement>;
export type FieldContentProps = HTMLAttributes<HTMLDivElement>;
export type FieldGroupProps = HTMLAttributes<HTMLDivElement>;

export { Content, Control, Description, FieldError as Error, Group, Label, Root };
