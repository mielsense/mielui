<script lang="ts">
    import { Slider } from '@mielui/svelte/components/slider';
    import { cn } from '@mielui/svelte/utils';
    import type { ColorPickerHueProps } from '.';
    import { getColorPickerController } from './controller.svelte';

    let { class: className, ...rest }: ColorPickerHueProps = $props();
    const controller = getColorPickerController();
    const hueSpectrum = ['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#f00'];
</script>

<div
    {...rest}
    data-ui="color-picker-hue"
    style:--picker-spectrum={`linear-gradient(to right, ${hueSpectrum.join(',')})`}
    class={cn(className, 'min-w-0 [&_[data-ui=slider-track]]:bg-[image:var(--picker-spectrum)] [&_[data-ui=slider-range]]:bg-transparent')}
>
    <Slider
        label="Hue"
        max={360}
        value={controller.state.hue}
        onValueChange={(next: number) => {
            controller.setHsvChannel('h', next);
        }}
    />
</div>
