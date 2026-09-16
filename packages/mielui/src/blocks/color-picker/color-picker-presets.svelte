<script lang="ts">
    import { Tick02Icon as Check } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { ColorPickerPresetsProps } from '.';
    import { getColorPickerContext } from './context';
    import { getColorPickerController } from './controller.svelte';

    let { class: className, ...rest }: ColorPickerPresetsProps = $props();
    const context = getColorPickerContext();
    const controller = getColorPickerController();
</script>

{#if context.options.length > 0}
    <div
        {...rest}
        data-ui="color-picker-presets"
        class={cn(className, 'grid grid-cols-7 gap-1.5 p-2')}
    >
        {#each context.options as option (option.value)}
            <button
                type="button"
                onclick={() => {
            controller.applyHex(option.value);
        }}
                title={option.label}
                aria-label={option.label}
                aria-pressed={option.value.toLowerCase() === context.value.toLowerCase()}
                class="relative grid size-6 place-items-center rounded-[var(--radius-md)] ring-1 ring-inset ring-border transition-transform duration-[var(--motion-duration-press)] hover:scale-110 motion-reduce:transition-none motion-reduce:hover:scale-100 focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                style:background={option.value}
            >
                {#if option.value.toLowerCase() === context.value.toLowerCase()}
                    <HugeiconsIcon icon={Check} size={12} class="text-white mix-blend-difference" />
                {/if}
            </button>
        {/each}
    </div>
{/if}
