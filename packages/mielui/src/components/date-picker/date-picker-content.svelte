<script lang="ts">
    import { panelIn, panelOut } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { DatePicker as DatePickerPrimitive } from 'bits-ui';
    import { overlaySurface } from '../_internal/surface';
    import type { DatePickerContentProps } from '.';

    let {
        children,
        class: className,
        ref = $bindable(null),
        surface,
        portal = true,
        sideOffset = 6,
        align = 'start',
        collisionPadding = 8,
        'aria-label': ariaLabel = 'Choose dates',
        ...rest
    }: DatePickerContentProps = $props();
</script>

<DatePickerPrimitive.Portal disabled={!portal}>
    <DatePickerPrimitive.Content
        {...rest}
        bind:ref
        forceMount
        {sideOffset}
        {align}
        {collisionPadding}
        aria-label={ariaLabel}
    >
        {#snippet child({ props, wrapperProps, open })}
            {#if open}
                <div {...wrapperProps} data-overlay-root class="z-[130]">
                    <div
                        {...props}
                        in:panelIn
                        out:panelOut
                        data-ui="date-picker-content"
                        data-surface={surface}
                        class={cn(className, overlaySurface(surface), 'z-[130] mielui-modal-frame max-h-[var(--bits-popover-content-available-height)] max-w-[var(--bits-popover-content-available-width)] overflow-auto text-foreground shadow-[var(--elevation-float)] outline-none origin-[var(--bits-popover-content-transform-origin)] [--mielui-modal-inset:calc(var(--spacing)*0.5)]')}
                    >
                        <div class="mielui-inset-surface min-w-0 p-0">
                            {@render children?.()}
                        </div>
                    </div>
                </div>
            {/if}
        {/snippet}
    </DatePickerPrimitive.Content>
</DatePickerPrimitive.Portal>
