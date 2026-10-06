import type { Snippet } from 'svelte';
import type {
    HTMLAttributes,
    HTMLButtonAttributes,
    HTMLFieldsetAttributes,
    HTMLFormAttributes,
    HTMLInputAttributes,
    HTMLTextareaAttributes
} from 'svelte/elements';
import Root from './question.svelte';
import Actions from './question-actions.svelte';
import Cancel from './question-cancel.svelte';
import Content from './question-content.svelte';
import Description from './question-description.svelte';
import Input from './question-input.svelte';
import Option from './question-option.svelte';
import Options from './question-options.svelte';
import Submit from './question-submit.svelte';
import Title from './question-title.svelte';

export type QuestionType = 'single' | 'multiple' | 'text';
export type QuestionAnswer = string | string[];
export type QuestionStatus = 'idle' | 'submitting' | 'error';

export type QuestionProps = {
    /** `inset` frames the question with its actions on the frame. */
    variant?: 'default' | 'inset';
    /** Current state, which drives the submit control. */
    status?: QuestionStatus;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Requires an answer before submitting. */
    required?: boolean;
    /** Focuses the first control when it mounts. */
    autofocus?: boolean;
    /** Field name of the answer. */
    name?: string;
    /** Message shown when `onSubmit` rejects. */
    errorMessage?: string;
    /** Called with the error when the action fails. */
    onError?: (error: unknown) => void;
    /** Called when Cancel is pressed. */
    onCancel?: (event: MouseEvent) => void;
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & Omit<
    HTMLFormAttributes,
    'children' | 'class' | 'onsubmit' | 'action' | 'method' | 'target' | 'enctype' | 'name'
> &
    (
        | {
              /** `single` and `multiple` offer options. `text` takes a written answer. */
              type?: 'single' | 'text';
              /** Current answer. Bindable. */
              value?: string;
              /** Called with the answer. Return a promise to show progress until it settles. */
              onSubmit: (answer: string, event: SubmitEvent) => void | Promise<void>;
          }
        | {
              /** `single` and `multiple` offer options. `text` takes a written answer. */
              type: 'multiple';
              /** Current answer. Bindable. */
              value?: string[];
              /** Called with the answer. Return a promise to show progress until it settles. */
              onSubmit: (answer: string[], event: SubmitEvent) => void | Promise<void>;
          }
    );

export type QuestionContentProps = {
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & Omit<HTMLFieldsetAttributes, 'children' | 'class'>;

export type QuestionTitleProps = {
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & Omit<HTMLAttributes<HTMLLegendElement>, 'children' | 'class'>;

export type QuestionDescriptionProps = {
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & Omit<HTMLAttributes<HTMLParagraphElement>, 'children' | 'class'>;

export type QuestionOptionsProps = {
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

export type QuestionOptionProps = {
    /** Value this option answers with. */
    value: string;
    /** Visible label of the option. */
    label: string;
    /** Supporting text under the option label. */
    description?: string;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Bindable reference to the DOM element. */
    element?: HTMLInputElement;
    /** Classes added to the element. */
    class?: string;
} & Omit<
    HTMLInputAttributes,
    'type' | 'value' | 'name' | 'checked' | 'disabled' | 'children' | 'class'
>;

export type QuestionInputProps = {
    /** Enter submits and Shift+Enter adds a line. Set false to make Enter add a line. */
    submitOnEnter?: boolean;
    /** Grows with its content instead of scrolling. */
    autoresize?: boolean;
    /** Text shown while there is no value. */
    placeholder?: string;
    /** Accessible name of the answer field. */
    'aria-label'?: string;
    /** Starting height in text rows. */
    rows?: number;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Shows the value without allowing edits. The value is still submitted. */
    readonly?: boolean;
    /** Bindable reference to the DOM element. */
    element?: HTMLTextAreaElement;
    /** Classes added to the element. */
    class?: string;
} & Omit<
    HTMLTextareaAttributes,
    | 'children'
    | 'class'
    | 'value'
    | 'name'
    | 'placeholder'
    | 'aria-label'
    | 'rows'
    | 'disabled'
    | 'readonly'
>;

export type QuestionActionsProps = {
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

export type QuestionActionProps = {
    /** Content rendered inside. */
    children?: Snippet;
    /** Called when it is clicked or activated. */
    onclick?: (event: MouseEvent) => void;
} & Omit<HTMLButtonAttributes, 'children' | 'onclick' | 'type'>;

export type QuestionSubmitProps = {
    /** Text of the submit button. */
    label?: string;
    /** Text shown while it is loading. */
    loadingLabel?: string;
    /** Content rendered inside. */
    children?: Snippet;
    /** Bindable reference to the DOM element. */
    element?: HTMLButtonElement | HTMLAnchorElement;
} & Omit<HTMLButtonAttributes, 'children' | 'type'>;

export { Actions, Cancel, Content, Description, Input, Option, Options, Root, Submit, Title };
