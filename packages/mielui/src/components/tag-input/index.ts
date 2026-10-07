import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes, HTMLInputAttributes } from 'svelte/elements';
import Root from './tag-input.svelte';
import Input from './tag-input-input.svelte';
import List from './tag-input-list.svelte';
import Tag from './tag-input-tag.svelte';

export type TagInputRejectionCode = 'duplicate' | 'invalid' | 'max-tags';

export type TagInputRejection = {
    value: string;
    code: TagInputRejectionCode;
    reason: string;
};

export type TagInputVariant = 'outline' | 'secondary';

export type TagInputLabels = {
    remove?: (tag: string) => string;
    duplicate?: (tag: string) => string;
    maxReached?: (max: number) => string;
    invalid?: (tag: string) => string;
};

export type TagInputProps = {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: TagInputLabels;
    /** Current tags. Bindable. */
    tags?: string[];
    /** Text in the input. Bindable. */
    query?: string;
    /** Largest number of tags. */
    max?: number;
    /** Allows the same tag more than once. */
    allowDuplicates?: boolean;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Visible label linked to the control. */
    label?: string;
    /** Supporting text under the label, announced with the control. */
    description?: string;
    /** Error message shown with the control. */
    error?: string;
    /** Field name submitted with the form. */
    name?: string;
    /**
     * Requires at least one tag for native form submission. Carried by a
     * dedicated validation anchor, since hidden inputs are barred from
     * constraint validation.
     */
    required?: boolean;
    /** Validation message shown when `required` is set and no tags are added. */
    requiredMessage?: string;
    /** `outline` has a border. `secondary` has a filled background. */
    variant?: TagInputVariant;
    /** Returns true to accept a tag, or a message that explains why it is refused. */
    validate?: (tag: string) => boolean | string;
    /** Cleans a tag before it is added, such as trimming or lowercasing it. */
    normalize?: (tag: string) => string;
    /** Characters that finish a tag as you type. */
    delimiters?: string[];
    /** Adds the typed text as a tag when the field loses focus. */
    addOnBlur?: boolean;
    /** Splits pasted text into tags. */
    addOnPaste?: boolean;
    /** Called with the new list when tags change. */
    onTagsChange?: (tags: string[]) => void;
    /** Called with each tag that is added. */
    onAdd?: (tag: string) => void;
    /** Called with each tag that is removed. */
    onRemove?: (tag: string) => void;
    /** Called when a tag is refused, with the reason. */
    onReject?: (rejection: TagInputRejection) => void;
    /** Id of the element. */
    id?: string;
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class' | 'id'>;

export type TagInputListProps = {
    /** Accessible name of the tag list. */
    label?: string;
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & Omit<HTMLAttributes<HTMLUListElement>, 'children' | 'class'>;

export type TagInputTagProps = {
    /** Text of the tag. */
    value: string;
    /** Position of the tag in the list. */
    index?: number;
    /** Shows the remove button. */
    removable?: boolean;
    /** Called with each tag that is removed. */
    onRemove?: (tag: string) => void;
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & Omit<HTMLButtonAttributes, 'children' | 'class' | 'type' | 'value' | 'onclick'>;

export type TagInputInputProps = {
    /** Text shown while there is no value. */
    placeholder?: string;
    /** Bindable reference to the DOM element. */
    element?: HTMLInputElement | undefined;
    /** Classes added to the element. */
    class?: string;
} & Omit<HTMLInputAttributes, 'children' | 'class' | 'value'>;

export { Input, List, Root, Tag };
