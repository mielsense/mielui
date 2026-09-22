<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Toggle as BitsToggle } from 'bits-ui';
    import type { ToggleProps } from '.';
    import { toggle } from './variants';

    let {
        class: className,
        pressed = $bindable(false),
        disabled = false,
        size = 'md',
        variant = 'default',
        children,
        onPressedChange,
        ...rest
    }: ToggleProps = $props();

    const resolvedVariant = $derived(
        variant === 'outlined' || variant === 'outline' ? 'outlined' : 'default'
    );
</script>

<BitsToggle.Root bind:pressed {disabled} {onPressedChange} {...rest} id={rest.id ?? undefined}>
    {#snippet child({ props })}
        <button
            {...props}
            type="button"
            use:pressable
            data-ui="toggle"
            data-state={pressed ? 'on' : 'off'}
            aria-pressed={pressed}
            {disabled}
            class={cn(className, toggle({ variant: resolvedVariant, pressed, size }))}
        >
            {@render children?.()}
        </button>
    {/snippet}
</BitsToggle.Root>
