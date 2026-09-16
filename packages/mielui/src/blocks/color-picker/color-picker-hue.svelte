<script lang="ts">
    import { Slider } from '@mielui/svelte/components/slider';
    import { cn } from '@mielui/svelte/utils';
    import type { ColorPickerHueProps } from '.';
    import { getColorPickerController } from './controller.svelte';

    let { class: className, ...rest }: ColorPickerHueProps = $props();
    const controller = getColorPickerController();
</script>

<div
    {...rest}
    data-ui="color-picker-hue"
    class={cn(className, 'min-w-0 [&_[data-ui=slider-track]]:bg-[linear-gradient(to_right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)] [&_[data-ui=slider-range]]:bg-transparent')}
>
    <Slider
        label="Hue"
        max={360}
        value={controller.state.hue}
        onValueChange={(next) => {
            controller.setHsvChannel('h', next);
        }}
    />
</div>
