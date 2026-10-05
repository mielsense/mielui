import { createContext } from '@mielui/svelte/utils';
import type { TagInputLabels } from '.';

export type TagInputContext = {
    readonly labels: TagInputLabels | undefined;
    readonly tags: string[];
    readonly disabled: boolean;
    readonly invalid: boolean;
    readonly required: boolean;
    readonly inputId: string;
    readonly describedBy: string | undefined;
    /** True when Root renders a `<label for>`, so Input must not shadow it with `aria-label`. */
    readonly hasLabel: boolean;
    readonly draft: string;
    readonly atMax: boolean;
    readonly delimiters: string[];
    readonly addOnBlur: boolean;
    readonly addOnPaste: boolean;
    setDraft: (next: string) => void;
    setInputElement: (element: HTMLInputElement | undefined) => void;
    focusInput: () => void;
    add: (raw: string) => boolean;
    commitDraft: () => boolean;
    removeAt: (index: number) => void;
    removeValue: (value: string) => void;
};

const { get: getTagInputContext, set: setTagInputContext } =
    createContext<TagInputContext>('tag-input');

export { getTagInputContext, setTagInputContext };
