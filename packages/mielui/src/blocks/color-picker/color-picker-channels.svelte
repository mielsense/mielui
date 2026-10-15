<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Slider } from '@mielui/svelte/components/slider';
    import { cn } from '@mielui/svelte/utils';
    import type { ColorPickerChannelsProps } from '.';
    import { getColorPickerContext } from './context';
    import { getColorPickerController } from './controller.svelte';

    let { class: className, ...rest }: ColorPickerChannelsProps = $props();
    const context = getColorPickerContext();
    const controller = getColorPickerController();
    const state = controller.state;
    const names = $derived({
        hue: context.labels?.hue ?? 'Hue',
        saturation: context.labels?.saturation ?? 'Saturation',
        lightness: context.labels?.lightness ?? 'Lightness',
        brightness: context.labels?.brightness ?? 'Brightness',
        red: context.labels?.red ?? 'Red',
        green: context.labels?.green ?? 'Green',
        blue: context.labels?.blue ?? 'Blue'
    });
    const channels = $derived(
        context.format === 'hsl'
            ? [
                  { key: 'h', name: names.hue, max: 360, value: state.hslH, unit: '°' },
                  { key: 's', name: names.saturation, max: 100, value: state.hslS, unit: '%' },
                  { key: 'l', name: names.lightness, max: 100, value: state.hslL, unit: '%' }
              ]
            : context.format === 'rgb'
              ? [
                    { key: 'r', name: names.red, max: 255, value: state.rgbR, unit: '' },
                    { key: 'g', name: names.green, max: 255, value: state.rgbG, unit: '' },
                    { key: 'b', name: names.blue, max: 255, value: state.rgbB, unit: '' }
                ]
              : [
                    { key: 'h', name: names.hue, max: 360, value: state.hue, unit: '°' },
                    { key: 's', name: names.saturation, max: 100, value: state.sat, unit: '%' },
                    { key: 'v', name: names.brightness, max: 100, value: state.val, unit: '%' }
                ]
    );

    function update(key: string, value: number) {
        if (context.format === 'hsl' && (key === 'h' || key === 's' || key === 'l')) {
            controller.setHslChannel(key, value);
        } else if (context.format === 'rgb' && (key === 'r' || key === 'g' || key === 'b')) {
            controller.setRgbChannel(key, value);
        } else if (key === 'h' || key === 's' || key === 'v') {
            controller.setHsvChannel(key, value);
        }
    }
</script>

<div
    {...rest}
    data-ui="color-picker-channels"
    class={cn(className, 'flex flex-col gap-1.5 px-2.5 py-2')}
>
    {#each channels as channel (channel.key)}
        <div class="flex items-center gap-2">
            <span
                aria-hidden="true"
                class="w-3 shrink-0 font-mono text-xs uppercase text-foreground-muted"
            >
                {channel.key}
            </span>
            <Slider
                class="min-w-0 flex-1"
                label={channel.name}
                max={channel.max}
                value={channel.value}
                onValueChange={(next: number) => {
                    update(channel.key, next);
                }}
            />
            <span
                aria-hidden="true"
                class="w-10 shrink-0 text-end font-mono text-xs tabular-nums text-foreground"
            >
                <span use:numberShuffle={{ value: Math.round(channel.value) }}>
                    {Math.round(channel.value)}
                </span>{channel.unit}
            </span>
        </div>
    {/each}
</div>
