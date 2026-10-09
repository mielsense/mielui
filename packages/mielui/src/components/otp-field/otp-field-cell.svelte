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
    class={cn(
        className,
        'relative flex size-[var(--size-control-lg)] shrink-0 items-center justify-center rounded-[var(--radius-lg)] border-[length:var(--border-size)] border-[var(--color-input)] bg-[var(--color-field)] text-[var(--color-field-foreground)] tabular-nums [font-size:var(--font-size-header)] [font-weight:var(--font-weight-label)] transition-[border-color,box-shadow] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] data-active:z-10 data-active:border-primary data-active:shadow-[var(--focus-ring)] motion-reduce:transition-none'
    )}
>
    {cell.char ?? ''}
    {#if cell.hasFakeCaret}
        <span
            class="mielui-otp-field-caret pointer-events-none absolute h-4 w-0.5 rounded-full bg-primary"
        ></span>
    {/if}
</PinInput.Cell>

<style>
    .mielui-otp-field-caret {
        animation: mielui-otp-field-caret calc(var(--motion-duration-panel, 200ms) * 6)
            steps(1, end) infinite;
    }

    @keyframes mielui-otp-field-caret {
        50% {
            opacity: 0;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .mielui-otp-field-caret {
            animation: none;
        }
    }
</style>
