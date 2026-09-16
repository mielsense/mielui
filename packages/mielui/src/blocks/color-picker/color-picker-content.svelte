<script lang="ts">
    import * as Popover from '@mielui/svelte/components/popover';
    import { cn } from '@mielui/svelte/utils';
    import type { ColorPickerContentProps } from '.';
    import Channels from './color-picker-channels.svelte';
    import HexInput from './color-picker-hex-input.svelte';
    import Hue from './color-picker-hue.svelte';
    import Plane from './color-picker-plane.svelte';
    import Presets from './color-picker-presets.svelte';
    import Preview from './color-picker-preview.svelte';
    import { getColorPickerContext } from './context';

    let {
        surface = 'solid',
        children,
        class: className,
        surfaceClass,
        'aria-label': ariaLabel,
        ...rest
    }: ColorPickerContentProps = $props();
    const context = getColorPickerContext();
</script>

<Popover.Content
    {...rest}
    {surface}
    aria-label={ariaLabel ?? context.label ?? 'Color picker'}
    class={cn(className, 'w-61 select-none')}
    surfaceClass={cn(surfaceClass, 'overflow-hidden p-0')}
>
    {#if children}
        {@render children()}
    {:else}
        <Plane />
        <div
            class="flex items-center gap-2.5 border-b-[length:var(--border-size)] border-border p-2"
        >
            <Preview />
            <div class="min-w-0 flex-1 space-y-1.5">
                <Hue />
                <HexInput />
            </div>
        </div>
        <Channels
            class={context.options.length > 0 ? 'border-b-[length:var(--border-size)] border-border' : undefined}
        />
        <Presets />
    {/if}
</Popover.Content>
