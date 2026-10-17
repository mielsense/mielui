<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { fieldMetadata } from '../_internal/field-metadata';
    import type { TagInputProps } from '.';
    import { setTagInputContext } from './context.svelte';
    import { createTagInputController } from './controller.svelte';

    let {
        tags = $bindable([]),
        query = $bindable(''),
        max,
        allowDuplicates = false,
        disabled = false,
        label,
        description,
        invalid,
        issues = [],
        name,
        required = false,
        labels,
        variant = 'outline',
        validate,
        normalize,
        delimiters = [','],
        addOnBlur = true,
        addOnPaste = true,
        onTagsChange,
        onAdd,
        onRemove,
        onReject,
        id: idProp,
        class: className,
        children,
        onclick,
        ...rest
    }: TagInputProps = $props();

    const messages = $derived([...new Set(issues.map((issue) => issue.message).filter(Boolean))]);
    const isInvalid = $derived(invalid ?? messages.length > 0);
    const generatedId = $props.id();
    const rootId = $derived(idProp ?? `tag-input-${generatedId}`);
    const metadata = $derived(
        fieldMetadata({
            id: `${rootId}-input`,
            metadataId: generatedId,
            description,
            error: messages[0],
            describedBy: rest['aria-describedby']
        })
    );

    const controller = createTagInputController({
        getTags: () => tags,
        setTags: (next) => {
            tags = next;
        },
        getQuery: () => query,
        setQuery: (next) => {
            query = next;
        },
        getMax: () => max,
        getAllowDuplicates: () => allowDuplicates,
        getDisabled: () => disabled,
        getRequired: () => required,
        getRequiredMessage: () => labels?.required ?? 'Add at least one tag.',
        getLabels: () => labels,
        getValidate: () => validate,
        getNormalize: () => normalize,
        getOnTagsChange: () => onTagsChange,
        getOnAdd: () => onAdd,
        getOnRemove: () => onRemove,
        getOnReject: () => onReject
    });
    const controlClass = $derived(
        variant === 'secondary'
            ? 'border-transparent bg-secondary hover:border-[var(--color-input)] has-[input:disabled]:border-transparent'
            : 'border-[var(--color-input)] bg-[var(--color-field)] hover:border-[var(--color-border-strong)] has-[input:disabled]:border-[var(--color-input)]'
    );

    function handleFieldClick(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
        onclick?.(event);

        if (event.defaultPrevented) {
            return;
        }

        const target = event.target as HTMLElement | null;

        if (target?.closest('[data-ui="tag-input-tag-remove"]')) {
            return;
        }

        if (!disabled) {
            controller.focusInput();
        }
    }

    setTagInputContext({
        get labels() {
            return labels;
        },
        get tags() {
            return controller.tags;
        },
        get disabled() {
            return disabled;
        },
        get invalid() {
            return isInvalid;
        },
        get required() {
            return required;
        },
        get inputId() {
            return metadata.controlId;
        },
        get draft() {
            return query;
        },
        get atMax() {
            return controller.atMax;
        },
        get delimiters() {
            return delimiters;
        },
        get addOnBlur() {
            return addOnBlur;
        },
        get addOnPaste() {
            return addOnPaste;
        },
        get describedBy() {
            return metadata.describedBy;
        },
        get hasLabel() {
            return label !== undefined && label !== '';
        },
        setDraft(next: string) {
            query = next;
        },
        setInputElement: controller.setInputElement,
        focusInput: controller.focusInput,
        add: controller.add,
        commitDraft: controller.commitDraft,
        removeAt: controller.removeAt,
        removeValue: controller.removeValue
    });
</script>

{#snippet field()}
    <div
        {...rest}
        id={rootId}
        data-ui="tag-input"
        data-variant={variant}
        data-disabled={disabled || undefined}
        data-invalid={isInvalid || undefined}
        onclick={handleFieldClick}
        class={cn(
            className,
            'flex min-h-[calc(var(--size-control-md)-var(--size-hairline))] w-full cursor-text flex-wrap items-center gap-1 rounded-[var(--radius-xl)] border-[length:var(--border-size)] p-1 transition-[background-color,border-color,box-shadow] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-[var(--opacity-disabled)]',
            isInvalid
                ? 'border-error has-[input:focus-visible]:shadow-[0_0_0_calc(var(--border-size)*3)_color-mix(in_srgb,var(--color-error)_30%,transparent)]'
                : 'has-[input:focus-visible]:border-primary has-[input:focus-visible]:shadow-[var(--focus-ring)]',
            controlClass
        )}
    >
        {@render children?.()}
    </div>
    {#if name}
        {#each controller.tags as tag, index (`${tag}-${index}`)}
            <input type="hidden" {name} {disabled} value={tag} />
        {/each}
    {/if}
    <span role="status" aria-live="polite" class="sr-only">{controller.spoken}</span>
{/snippet}

{#snippet meta()}
    {#if label}
        <label
            for={metadata.controlId}
            class="w-fit select-none [font-size:var(--font-size-label)] [font-weight:var(--font-weight-label)] [letter-spacing:var(--tracking-label)] leading-label text-foreground [font-family:var(--font-sans),sans-serif]"
        >
            {label}
        </label>
    {/if}
    {@render field()}
    {#if messages.length > 0}
        <div
            id={metadata.errorId}
            role="alert"
            class="[font-size:var(--font-size-label)] [font-weight:var(--font-weight-description)] leading-snug text-[var(--mielui-error-text)]"
        >
            {#if messages.length === 1}
                {messages[0]}
            {:else}
                <ul class="list-disc space-y-1 ps-4">
                    {#each messages as message (message)}
                        <li>{message}</li>
                    {/each}
                </ul>
            {/if}
        </div>
    {:else if description}
        <span
            id={metadata.descriptionId}
            class="[font-size:var(--font-size-label)] [font-weight:var(--font-weight-description)] [letter-spacing:var(--tracking-body)] leading-snug text-foreground-muted"
        >
            {description}
        </span>
    {/if}
{/snippet}

{#if label || description || messages.length > 0}
    <div data-ui="tag-input-field" class="flex w-full flex-col gap-1.5">
        {@render meta()}
    </div>
{:else}
    {@render field()}
{/if}
