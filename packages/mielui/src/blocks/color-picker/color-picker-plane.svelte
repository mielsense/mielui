<script lang="ts">
    import { Slider } from '@mielui/svelte/components/slider';
    import { cn } from '@mielui/svelte/utils';
    import type { ColorPickerPlaneProps } from '.';
    import { getColorPickerController } from './controller.svelte';
    import { colorPlanePointer } from './pointer';

    let { class: className, ...rest }: ColorPickerPlaneProps = $props();
    const controller = getColorPickerController();
    const hsvBlack = '#000';
    const hsvWhite = '#fff';
    const thumbInset = 'calc(var(--spacing) * 2 + var(--border-size) * 3)';
</script>

<div
    {...rest}
    data-ui="color-picker-plane"
    use:colorPlanePointer={controller.setPlane}
    class={cn(
        className,
        'relative h-37 w-full touch-none cursor-crosshair rounded-[var(--radius-md)] bg-[linear-gradient(to_bottom,transparent,var(--picker-black)),linear-gradient(to_right,var(--picker-white),var(--picker-hue))] shadow-[inset_0_0_0_var(--border-size)_var(--color-border)] transition-shadow [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none has-[:focus-visible]:shadow-[var(--focus-ring),inset_0_0_0_var(--border-size)_var(--color-border)]'
    )}
    style:--picker-black={hsvBlack}
    style:--picker-white={hsvWhite}
    style:--picker-hue={controller.hueColor}
>
    <div
        aria-hidden="true"
        class="mielui-glow mielui-glow-neutral pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[var(--mielui-glow-shadow),0_0_0_calc(var(--border-size)*3)_white] [--mielui-glow-ring:var(--color-border-strong)] dark:[--mielui-glow-color:var(--color-foreground)]"
        style:left={`clamp(${thumbInset}, ${controller.state.sat}%, calc(100% - ${thumbInset}))`}
        style:top={`clamp(${thumbInset}, ${100 - controller.state.val}%, calc(100% - ${thumbInset}))`}
    ></div>
    <Slider
        class="sr-only"
        label="Saturation"
        max={100}
        value={controller.state.sat}
        onValueChange={(next: number) => {
            controller.setHsvChannel('s', next);
        }}
    />
    <Slider
        class="sr-only"
        label="Brightness"
        max={100}
        value={controller.state.val}
        onValueChange={(next: number) => {
            controller.setHsvChannel('v', next);
        }}
    />
</div>
