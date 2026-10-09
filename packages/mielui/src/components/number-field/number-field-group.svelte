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
    class={cn(className, 'flex min-w-0 items-stretch rounded-[var(--radius-control)] border-[length:var(--border-size)] border-[var(--color-input)] bg-[var(--color-field)] transition-[border-color,box-shadow] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none hover:border-[var(--color-border-strong)] has-[input:focus-visible]:border-primary has-[input:focus-visible]:shadow-[var(--focus-ring)] has-[[aria-invalid=true]]:border-error has-[[aria-invalid=true]]:has-[input:focus-visible]:shadow-[0_0_0_calc(var(--border-size)*3)_color-mix(in_srgb,var(--color-error)_30%,transparent)] data-disabled:border-[var(--color-input)] data-disabled:opacity-[var(--opacity-disabled)] [&[data-disabled]>[data-ui=button]]:opacity-100 [&[data-disabled]>input]:opacity-100')}
>
    {@render children?.()}
</div>
