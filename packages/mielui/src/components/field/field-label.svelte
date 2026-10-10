<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FieldLabelProps } from '.';
    import { getFieldContext } from './context.svelte';

    let { children, class: className, for: htmlFor, ...rest }: FieldLabelProps = $props();
    const field = getFieldContext();
</script>

<label
    {...rest}
    for={htmlFor ?? field.controlId}
    data-ui="field-label"
    data-required={field.required || undefined}
    class={cn(
        className,
        'flex w-fit items-center gap-1.5 [font-size:var(--font-size-label)] [font-weight:var(--font-weight-label)] [letter-spacing:var(--tracking-label)] leading-label text-foreground',
        field.disabled && 'cursor-not-allowed'
    )}
>
    {@render children?.()}
    {#if field.required}
        <span aria-hidden="true" data-ui="required-mark" class="text-[var(--mielui-error-text)]"
            >*</span
        >
    {/if}
</label>
