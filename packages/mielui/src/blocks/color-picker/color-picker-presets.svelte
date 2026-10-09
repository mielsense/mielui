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
        class={cn(className, 'grid grid-cols-7 place-items-center gap-y-2 p-2.5')}
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
                class="relative grid size-5 place-items-center rounded-full shadow-[inset_0_0_0_var(--border-size)_var(--color-border)] transition-shadow [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none hover:shadow-[inset_0_0_0_var(--border-size)_var(--color-border-strong)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring),inset_0_0_0_var(--border-size)_var(--color-border)] aria-pressed:shadow-[0_0_0_calc(var(--border-size)*2)_var(--color-panel),0_0_0_calc(var(--border-size)*3)_var(--color-border-strong),inset_0_0_0_var(--border-size)_var(--color-border)] aria-pressed:focus-visible:shadow-[0_0_0_calc(var(--border-size)*2)_var(--color-panel),0_0_0_calc(var(--border-size)*5)_var(--color-ring),inset_0_0_0_var(--border-size)_var(--color-border)]"
                style:background={option.value}
            >
                {#if option.value.toLowerCase() === context.value.toLowerCase()}
                    <HugeiconsIcon icon={Check} size={12} class="text-white mix-blend-difference" />
                {/if}
            </button>
        {/each}
    </div>
{/if}
