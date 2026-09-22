<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { NumberFieldGroupProps } from '.';
    import { getNumberFieldContext } from './context';

    let { children, class: className, ...rest }: NumberFieldGroupProps = $props();
    const context = getNumberFieldContext();
</script>
<div
    {...rest}
    data-ui="number-field-group"
    data-disabled={context.disabled || undefined}
    class={cn(className, 'flex min-w-0 items-center rounded-[var(--radius-lg)] border-[length:var(--border-size)] border-[var(--color-input)] bg-[var(--color-field)] transition-[border-color,box-shadow] ease-[var(--ease-press)] [transition-duration:var(--motion-duration-press)] focus-within:border-primary shadow-[var(--elevation-control-edge)] focus-within:shadow-[var(--focus-ring),var(--elevation-control-edge)] has-[[aria-invalid=true]]:border-error data-disabled:opacity-[var(--opacity-disabled)] motion-reduce:transition-none')}
>
    {@render children?.()}
</div>
