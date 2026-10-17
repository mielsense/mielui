import type { TagInputProps, TagInputRejection } from '.';

const PASTE_SEPARATORS = [',', ';', '\n'];

/** Splits pasted text into trimmed, non-empty tags on commas, semicolons, newlines, and `delimiters`. */
export function splitTags(value: string, delimiters: readonly string[]) {
    const separators = new Set([...PASTE_SEPARATORS, ...delimiters]);
    const tags: string[] = [];
    let current = '';

    for (const char of value) {
        if (!separators.has(char)) {
            current += char;
            continue;
        }
        const trimmed = current.trim();
        if (trimmed !== '') {
            tags.push(trimmed);
        }
        current = '';
    }

    const tail = current.trim();
    if (tail !== '') {
        tags.push(tail);
    }

    return tags;
}

type ControllerOptions = {
    tags: string[];
    query: string;
    readonly max: TagInputProps['max'];
    readonly allowDuplicates: boolean;
    readonly disabled: boolean;
    readonly required: boolean;
    readonly requiredMessage: string;
    readonly labels: TagInputProps['labels'];
    readonly validate: TagInputProps['validate'];
    readonly normalize: TagInputProps['normalize'];
    readonly onTagsChange: TagInputProps['onTagsChange'];
    readonly onAdd: TagInputProps['onAdd'];
    readonly onRemove: TagInputProps['onRemove'];
    readonly onReject: TagInputProps['onReject'];
};

export function createTagInputController(options: ControllerOptions) {
    let inputElement = $state<HTMLInputElement | undefined>(undefined);
    let spoken = $state('');

    const safeTags = $derived.by(() => {
        const tags = options.tags;

        return Array.isArray(tags) ? tags : [];
    });
    const atMax = $derived.by(() => {
        const max = options.max;

        return max !== undefined && safeTags.length >= max;
    });

    function toCandidate(raw: string) {
        const normalize = options.normalize;

        if (normalize) {
            return normalize(raw);
        }

        return raw.trim();
    }

    function emit(next: string[]) {
        options.tags = next;
        options.onTagsChange?.(next);
    }

    /** Speaks the reason through the live region, since `onReject` alone is silent to a screen reader. */
    function reject(rejection: TagInputRejection) {
        spoken = rejection.reason;
        options.onReject?.(rejection);

        return false;
    }

    function add(raw: string) {
        if (options.disabled) {
            return false;
        }

        const candidate = toCandidate(raw);

        if (candidate === '') {
            return false;
        }

        if (!options.allowDuplicates && safeTags.includes(candidate)) {
            return reject({
                code: 'duplicate',
                reason:
                    options.labels?.duplicate?.(candidate) ?? `"${candidate}" is already added.`,
                value: candidate
            });
        }

        const max = options.max;

        if (max !== undefined && safeTags.length >= max) {
            return reject({
                code: 'max-tags',
                reason:
                    options.labels?.maxReached?.(max) ??
                    `Only ${max} ${max === 1 ? 'tag is' : 'tags are'} allowed.`,
                value: candidate
            });
        }

        const validate = options.validate;

        if (validate) {
            const result = validate(candidate);

            if (result === false) {
                return reject({
                    code: 'invalid',
                    reason:
                        options.labels?.invalid?.(candidate) ??
                        `"${candidate}" is not a valid tag.`,
                    value: candidate
                });
            }

            if (typeof result === 'string' && result !== '') {
                return reject({
                    code: 'invalid',
                    reason: result,
                    value: candidate
                });
            }
        }

        const next = [...safeTags, candidate];

        emit(next);
        options.query = '';
        spoken =
            options.labels?.added?.(candidate, next.length) ??
            `${candidate} added. ${next.length} ${next.length === 1 ? 'tag' : 'tags'} total.`;
        options.onAdd?.(candidate);

        return true;
    }

    function removeAt(index: number) {
        if (options.disabled) {
            return;
        }

        if (index < 0 || index >= safeTags.length) {
            return;
        }

        const removed = safeTags[index] ?? '';
        const next = safeTags.filter((_, position) => position !== index);

        emit(next);
        spoken =
            options.labels?.removed?.(removed, next.length) ??
            `${removed} removed. ${next.length} ${next.length === 1 ? 'tag' : 'tags'} total.`;
        options.onRemove?.(removed);
    }

    function removeValue(value: string) {
        const index = safeTags.indexOf(value);

        if (index >= 0) {
            removeAt(index);
        }
    }

    function commitDraft() {
        return add(options.query);
    }

    function focusInput() {
        inputElement?.focus({ preventScroll: true });
    }

    function setInputElement(element: HTMLInputElement | undefined) {
        inputElement = element;
    }

    /** Hidden inputs are barred from constraint validation, so the visible input carries `required`. */
    $effect(() => {
        inputElement?.setCustomValidity(
            options.required && safeTags.length === 0 ? options.requiredMessage : ''
        );
    });

    return {
        get tags() {
            return safeTags;
        },
        get atMax() {
            return atMax;
        },
        get spoken() {
            return spoken;
        },
        setInputElement,
        focusInput,
        add,
        commitDraft,
        removeAt,
        removeValue
    };
}
