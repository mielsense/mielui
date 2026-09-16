<script lang="ts">
    import { Slider } from '@mielui/svelte/components/slider';
    import { cn } from '@mielui/svelte/utils';
    import type { ColorPickerPlaneProps } from '.';
    import { getColorPickerController } from './controller.svelte';
    import { colorPlanePointer } from './pointer';

    let { class: className, ...rest }: ColorPickerPlaneProps = $props();
    const controller = getColorPickerController();
</script>

<div
    {...rest}
    data-ui="color-picker-plane"
    use:colorPlanePointer={controller.setPlane}
    class={cn(className, 'relative h-37 w-full touch-none cursor-crosshair overflow-hidden rounded-b-[var(--radius-md)] bg-[linear-gradient(to_bottom,transparent,#000),linear-gradient(to_right,#fff,var(--picker-hue))] focus-within:ring-2 focus-within:ring-inset focus-within:ring-[var(--color-ring)]')}
    style:--picker-hue={controller.hueColor}
>
    <div
        aria-hidden="true"
        class="pointer-events-none absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[var(--elevation-control)]"
        style:left={`${controller.state.sat}%`}
        style:top={`${100 - controller.state.val}%`}
        style:background={controller.previewHex}
    ></div>
    <Slider
        class="sr-only"
        label="Saturation"
        max={100}
        value={controller.state.sat}
        onValueChange={(next) => {
            controller.setHsvChannel('s', next);
        }}
    />
    <Slider
        class="sr-only"
        label="Brightness"
        max={100}
        value={controller.state.val}
        onValueChange={(next) => {
            controller.setHsvChannel('v', next);
        }}
    />
</div>
