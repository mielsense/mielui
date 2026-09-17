<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { createAttachmentKey } from 'svelte/attachments';
    import type { FieldControlAttributes, FieldProps } from '.';
    import { setFieldContext } from './context.svelte';
    import { connectFieldMetadata } from './metadata';

    let {
        controlId,
        disabled = false,
        required = false,
        invalid,
        issues = [],
        orientation = 'vertical',
        element = $bindable(),
        children,
        class: className,
        ...rest
    }: FieldProps = $props();
    const uid = $props.id();
    const attachment = createAttachmentKey();
    const resolvedId = $derived(controlId ?? `field-${uid}`);
    const isInvalid = $derived(invalid ?? issues.length > 0);
    const control = $derived<FieldControlAttributes>({
        id: resolvedId,
        disabled: disabled || undefined,
        required: required || undefined,
        'aria-invalid': isInvalid ? 'true' : undefined,
        [attachment]: connectFieldMetadata
    });
    setFieldContext({
        get controlId() {
            return resolvedId;
        },
        get invalid() {
            return isInvalid;
        },
        get disabled() {
            return disabled;
        },
        get required() {
            return required;
        },
        get issues() {
            return issues;
        },
        get control() {
            return control;
        }
    });
</script>

<div
    {...rest}
    bind:this={element}
    data-ui="field"
    data-invalid={isInvalid || undefined}
    data-disabled={disabled || undefined}
    data-orientation={orientation}
    class={cn(className, 'group/field flex min-w-0 gap-2', orientation === 'horizontal' ? 'flex-row items-start' : 'flex-col', disabled && 'opacity-[var(--opacity-disabled)]')}
>
    {@render children?.()}
</div>
