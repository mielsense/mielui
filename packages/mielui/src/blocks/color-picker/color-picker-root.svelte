<script lang="ts">
    import * as Popover from '@mielui/svelte/components/popover';
    import { cn } from '@mielui/svelte/utils';
    import type { ColorPickerProps } from '.';
    import { type ColorPickerContext, setColorPickerContext } from './context';
    import { createColorPickerController, setColorPickerController } from './controller.svelte';

    let {
        label,
        value = $bindable(''),
        onValueChange,
        options = [],
        format = 'hsl',
        class: className,
        children
    }: ColorPickerProps = $props();

    const labelId = $props.id();

    const context: ColorPickerContext = {
        labelId,
        get label() {
            return label;
        },
        get value() {
            return value;
        },
        get options() {
            return options;
        },
        get format() {
            return format;
        },
        apply: (hex) => {
            const next = hex.toLowerCase();
            value = next;
            onValueChange?.(next);
        }
    };
    setColorPickerContext(context);
    setColorPickerController(createColorPickerController(context));
</script>

<div class={cn(className, 'flex flex-col gap-1.5')}>
    {#if label}
        <p
            id={labelId}
            class="[font-size:var(--font-size-label)] [font-weight:var(--font-weight-label)] [letter-spacing:var(--tracking-label)] leading-label text-foreground"
        >
            {label}
        </p>
    {/if}

    <Popover.Root placement="bottom">{@render children?.()} </Popover.Root>
</div>
