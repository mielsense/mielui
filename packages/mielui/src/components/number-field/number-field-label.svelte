<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { NumberFieldLabelProps } from '.';
    import { getNumberFieldContext } from './context';

    let { children, class: className, for: htmlFor, ...rest }: NumberFieldLabelProps = $props();
    const context = getNumberFieldContext();
</script>
<label
    {...rest}
    for={htmlFor ?? context.id}
    data-ui="number-field-label"
    class={cn(className, 'text-foreground [font-size:var(--font-size-body)] [font-weight:var(--font-weight-medium)]')}
>
    {@render children?.()}
</label>
