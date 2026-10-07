<script lang="ts">
    import { ColorPickerIcon as Pipette } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import { onMount } from 'svelte';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { ColorPickerHexInputProps } from '.';
    import { getColorPickerController } from './controller.svelte';

    type EyeDropper = new () => {
        open: () => Promise<{
            sRGBHex: string;
        }>;
    };

    let { class: className, ...rest }: ColorPickerHexInputProps = $props();
    const controller = getColorPickerController();
    let eyeDropper = $state<EyeDropper>();

    onMount(() => {
        eyeDropper = (window as Window & { EyeDropper?: EyeDropper }).EyeDropper;
    });

    async function pickFromScreen() {
        if (!eyeDropper) {
            return;
        }
        try {
            const result = await new eyeDropper().open();
            controller.applyHex(result.sRGBHex);
        } catch {
            return;
        }
    }
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
            const input = event.currentTarget;
            controller.handleHexInput(input.value);
            const accepted = controller.state.hexInput.replace(/^#/, '');
            if (input.value !== accepted) {
                input.value = accepted;
            }
        }}
        onkeydown={(event) => {
            if (event.key === 'Enter' && !event.isComposing) {
                event.preventDefault();
                controller.applyHex(controller.state.hexInput);
            }
        }}
    />
    {#if eyeDropper}
        <button
            type="button"
            aria-label="Pick a color from the screen"
            title="Pick a color from the screen"
            data-ui="color-picker-eyedropper"
            class="-me-0.5 grid size-5 shrink-0 place-items-center rounded-[var(--radius-sm)] text-foreground-muted outline-none transition-colors [transition-duration:var(--motion-duration-hover)] hover:bg-secondary hover:text-foreground focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none"
            onclick={pickFromScreen}
        >
            <HugeiconsIcon icon={Pipette} size={13} aria-hidden="true" />
        </button>
    {/if}
</div>
