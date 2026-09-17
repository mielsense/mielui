<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { PinInput } from 'bits-ui';
    import type { OTPFieldCellProps } from '.';

    let { cell, ref = $bindable(null), class: className, ...rest }: OTPFieldCellProps = $props();
</script>
<PinInput.Cell
    {...rest}
    {cell}
    bind:ref
    aria-hidden="true"
    data-ui="otp-field-cell"
    class={cn(className, 'relative flex size-[var(--size-control-lg)] shrink-0 items-center justify-center rounded-[var(--radius-md)] border-[length:var(--border-size)] border-[var(--color-input)] bg-[var(--color-field)] text-foreground tabular-nums [font-size:var(--font-size-body)] transition-[border-color,box-shadow] [transition-duration:var(--motion-duration-press)] data-active:border-primary data-active:shadow-[var(--focus-ring)] motion-reduce:transition-none')}
>
    {cell.char ?? ''}
    {#if cell.hasFakeCaret}
        <span class="pointer-events-none absolute h-4 w-px bg-foreground"></span>
    {/if}
</PinInput.Cell>
