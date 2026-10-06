import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type {
    HTMLAttributes,
    HTMLButtonAttributes,
    HTMLFormAttributes,
    HTMLTextareaAttributes
} from 'svelte/elements';
import Root from './composer.svelte';
import Actions from './composer-actions.svelte';
import Header from './composer-header.svelte';
import Input from './composer-input.svelte';
import Submit from './composer-submit.svelte';
import Toolbar from './composer-toolbar.svelte';

export type ComposerStatus = 'idle' | 'submitting' | 'error';

export type ComposerProps = {
    /** Surface treatment. Omit it to inherit `--mielui-surface` from the theme. */
    surface?: 'solid' | 'glass';
    /** Message text. Bindable. */
    value?: string;
    /** Current state of the composer, which sets what the submit control does. */
    status?: ComposerStatus;
    /** Whether a response is being generated independently of submission state. */
    generating?: boolean;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Allows submitting with no text, for a message that is only attachments. */
    allowEmpty?: boolean;
    /** Called with the text on submit. Return a promise to show progress until it settles. */
    onSubmit: (value: string, event: SubmitEvent) => void | Promise<void>;
    /** Message shown when `onSubmit` rejects. */
    errorMessage?: string;
    /** Called with the error when `onSubmit` rejects. */
    onError?: (error: unknown) => void;
    /** Called when the stop control is pressed during a response. */
    onStop?: () => void;
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & Omit<
    HTMLFormAttributes,
    'children' | 'class' | 'onsubmit' | 'action' | 'method' | 'target' | 'enctype'
>;

export type ComposerHeaderProps = {
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

export type ComposerInputProps = {
    /** Enter submits and Shift+Enter adds a line. Set false to make Enter add a line. */
    submitOnEnter?: boolean;
    /** Bindable reference to the DOM element. */
    element?: HTMLTextAreaElement;
    /** Classes added to the element. */
    class?: string;
} & Omit<HTMLTextareaAttributes, 'children' | 'class' | 'value'>;

export type ComposerToolbarProps = {
    /** `chrome` sits on the frame under the input. `inset` joins the input. */
    variant?: 'chrome' | 'inset';
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class' | 'role'>;

export type ComposerActionsProps = {
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

export type ComposerSubmitProps = {
    /** Accessible name of the send button. */
    label?: string;
    /** Accessible name while a message can be queued behind a running response. */
    queueLabel?: string;
    /** Accessible name while the button stops a response. */
    stopLabel?: string;
    /** Text shown while it is loading. */
    loadingLabel?: string;
    /** Content rendered inside. */
    children?: Snippet<[ComposerSubmitState]>;
    /** Bindable reference to the DOM element. */
    element?: HTMLButtonElement | HTMLAnchorElement;
    /** Called when it is clicked or activated. */
    onclick?: (event: MouseEvent) => void;
    /** Classes added to the element. */
    class?: string;
} & Omit<DefaultProps, 'children'> &
    Omit<HTMLButtonAttributes, 'children' | 'class' | 'type' | 'onclick'>;

export type ComposerSubmitAction = 'send' | 'queue' | 'stop' | 'pending';

export type ComposerSubmitState = Readonly<{
    action: ComposerSubmitAction;
    generating: boolean;
    empty: boolean;
}>;

export { Actions, Header, Input, Root, Submit, Toolbar };
