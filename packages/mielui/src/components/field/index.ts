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
    controlId?: string;
    disabled?: boolean;
    required?: boolean;
    invalid?: boolean;
    issues?: readonly FieldIssue[];
    orientation?: 'vertical' | 'horizontal';
    element?: HTMLDivElement;
} & HTMLAttributes<HTMLDivElement>;

export type FieldControlProps = {
    describedBy?: string;
    errorId?: string;
    children: Snippet<[FieldControlAttributes]>;
};

export type FieldLabelProps = HTMLLabelAttributes;
export type FieldDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type FieldErrorProps = {
    issues?: readonly FieldIssue[];
} & HTMLAttributes<HTMLDivElement>;
export type FieldContentProps = HTMLAttributes<HTMLDivElement>;
export type FieldGroupProps = HTMLAttributes<HTMLDivElement>;

export { Content, Control, Description, FieldError as Error, Group, Label, Root };
