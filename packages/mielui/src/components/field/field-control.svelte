<script lang="ts">
    import type { FieldControlProps } from '.';
    import { getFieldContext } from './context.svelte';

    let { children, describedBy, errorId }: FieldControlProps = $props();
    const field = getFieldContext();
    const attributes = $derived({
        ...field.control,
        'aria-describedby':
            [describedBy, field.invalid ? errorId : undefined].filter(Boolean).join(' ') ||
            undefined
    });
</script>

{@render children(attributes)}
