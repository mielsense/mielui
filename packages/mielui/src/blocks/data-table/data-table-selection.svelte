<script lang="ts">
    import { MinusSignIcon, Tick02Icon } from '@hugeicons/core-free-icons';
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Checkbox } from 'bits-ui';
    import { checkboxBox } from '../../components/checkbox/variants';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { DataTableSelectionProps } from '.';

    let {
        class: className,
        checked = false,
        indeterminate = false,
        disabled = false,
        label,
        onCheckedChange
    }: DataTableSelectionProps = $props();
</script>
<Checkbox.Root
    {checked}
    indeterminate={indeterminate && !checked}
    {disabled}
    {onCheckedChange}
    aria-label={label}
>
    {#snippet child({ props })}
        <button
            type="button"
            {...props}
            use:pressable
            class={cn(
                className,
                checkboxBox({
                    checked: checked || indeterminate,
                    size: 'sm'
                }),
                "relative before:absolute before:-inset-3.5 before:content-[''] outline-none hover:border-[color-mix(in_oklab,var(--color-foreground)_45%,var(--color-card))] focus-visible:shadow-[var(--focus-ring)] disabled:opacity-[var(--opacity-disabled)]"
            )}
        >
            <HugeiconsIcon
                icon={checked ? Tick02Icon : MinusSignIcon}
                size={12}
                strokeWidth={2.5}
                class={cn('text-[var(--color-on-primary)] transition-[opacity,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none', checked || indeterminate ? 'scale-100 opacity-100' : 'scale-90 opacity-0')}
            />
        </button>
    {/snippet}
</Checkbox.Root>
