import type { TagInputProps, TagInputRejection } from '.';

type ControllerOptions = {
    getTags: () => string[];
    setTags: (tags: string[]) => void;
    getQuery: () => string;
    setQuery: (query: string) => void;
    getMax: () => TagInputProps['max'];
    getAllowDuplicates: () => boolean;
    getDisabled: () => boolean;
    getRequired: () => boolean;
    getRequiredMessage: () => string;
    getLabels: () => TagInputProps['labels'];
    getValidate: () => TagInputProps['validate'];
    getNormalize: () => TagInputProps['normalize'];
    getOnTagsChange: () => TagInputProps['onTagsChange'];
    getOnAdd: () => TagInputProps['onAdd'];
    getOnRemove: () => TagInputProps['onRemove'];
    getOnReject: () => TagInputProps['onReject'];
};

export function createTagInputController(options: ControllerOptions) {
    let inputElement = $state<HTMLInputElement | undefined>(undefined);
    let spoken = $state('');

    const safeTags = $derived.by(() => {
        const tags = options.getTags();

        return Array.isArray(tags) ? tags : [];
    });
    const atMax = $derived.by(() => {
        const max = options.getMax();

        return max !== undefined && safeTags.length >= max;
    });

    function toCandidate(raw: string) {
        const normalize = options.getNormalize();

        if (normalize) {
            return normalize(raw);
        }

        return raw.trim();
    }

    function emit(next: string[]) {
        options.setTags(next);
        options.getOnTagsChange()?.(next);
    }

    /** Speaks the reason through the live region, since `onReject` alone is silent to a screen reader. */
    function reject(rejection: TagInputRejection) {
        spoken = rejection.reason;
        options.getOnReject()?.(rejection);

        return false;
    }

    function add(raw: string) {
        if (options.getDisabled()) {
            return false;
        }

        const candidate = toCandidate(raw);

        if (candidate === '') {
            return false;
        }

        if (!options.getAllowDuplicates() && safeTags.includes(candidate)) {
            return reject({
                code: 'duplicate',
                reason:
                    options.getLabels()?.duplicate?.(candidate) ??
                    `"${candidate}" is already added.`,
                value: candidate
            });
        }

        const max = options.getMax();

        if (max !== undefined && safeTags.length >= max) {
            return reject({
                code: 'max-tags',
                reason:
                    options.getLabels()?.maxReached?.(max) ??
                    `Only ${max} ${max === 1 ? 'tag is' : 'tags are'} allowed.`,
                value: candidate
            });
        }

        const validate = options.getValidate();

        if (validate) {
            const result = validate(candidate);

            if (result === false) {
                return reject({
                    code: 'invalid',
                    reason:
                        options.getLabels()?.invalid?.(candidate) ??
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
        options.setQuery('');
        spoken = `${candidate} added. ${next.length} ${next.length === 1 ? 'tag' : 'tags'} total.`;
        options.getOnAdd()?.(candidate);

        return true;
    }

    function removeAt(index: number) {
        if (options.getDisabled()) {
            return;
        }

        if (index < 0 || index >= safeTags.length) {
            return;
        }

        const removed = safeTags[index] ?? '';
        const next = safeTags.filter((_, position) => position !== index);

        emit(next);
        spoken = `${removed} removed. ${next.length} ${next.length === 1 ? 'tag' : 'tags'} total.`;
        options.getOnRemove()?.(removed);
    }

    function removeValue(value: string) {
        const index = safeTags.indexOf(value);

        if (index >= 0) {
            removeAt(index);
        }
    }

    function commitDraft() {
        return add(options.getQuery());
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
            options.getRequired() && safeTags.length === 0 ? options.getRequiredMessage() : ''
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
