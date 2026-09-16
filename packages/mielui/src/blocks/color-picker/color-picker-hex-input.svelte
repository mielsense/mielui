<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { ColorPickerHexInputProps } from '.';
    import { getColorPickerController } from './controller.svelte';

    let { class: className, ...rest }: ColorPickerHexInputProps = $props();
    const controller = getColorPickerController();
</script>

<div
    {...rest}
    data-ui="color-picker-hex-input"
    class={cn(className, 'flex items-center gap-1 rounded-[var(--radius-md)] border-[length:var(--border-size)] border-border bg-background px-1.5 focus-within:shadow-[var(--focus-ring)]')}
>
    <span aria-hidden="true" class="font-mono text-sm text-foreground-muted">#</span>
    <input
        aria-label="Hex color"
        class="h-6 min-w-0 flex-1 select-text bg-transparent font-mono text-sm uppercase text-foreground outline-none"
        value={controller.state.hexInput.replace(/^#/, '')}
        placeholder="000000"
        spellcheck={false}
        autocomplete="off"
        oninput={(event) => {
            controller.handleHexInput(event.currentTarget.value);
        }}
        onkeydown={(event) => {
            if (event.key === 'Enter' && !event.isComposing) {
                event.preventDefault();
                controller.applyHex(controller.state.hexInput);
            }
        }}
    />
</div>
