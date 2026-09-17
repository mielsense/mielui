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
    class={cn(className, 'flex w-fit items-center gap-1.5 text-sm font-label leading-none text-foreground', field.disabled && 'cursor-not-allowed')}
>
    {@render children?.()}
</label>
