<script module lang="ts">
    import { Tick02Icon as Check } from '@hugeicons/core-free-icons';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    export const floatingFrame =
        'mielui-float-frame flex flex-col overflow-hidden text-sm text-foreground shadow-[var(--elevation-float)]';
    export const floatingSurface = 'mielui-inset-surface flex flex-col p-1';
    export const modalFrame =
        'mielui-modal-frame flex flex-col overflow-hidden text-foreground shadow-[var(--elevation-modal)]';
    export const highlightedItem = 'bg-foreground/[0.06] dark:bg-foreground/[0.08]';

    export { menu };
</script>

{#snippet menu(items: string[], selected: number, label?: string)}
    <div class={`${floatingFrame} w-full`}>
        <div class={floatingSurface}>
            {#if label}
                <span class="mielui-menu-label">{label}</span>
            {/if}
            {#each items as item, index (item)}
                <span class={`mielui-menu-item ${index === selected ? highlightedItem : ''}`}>
                    <span class="flex-1 truncate">{item}</span>
                    {#if index === selected}
                        <HugeiconsIcon icon={Check} size={14} aria-hidden="true" />
                    {/if}
                </span>
            {/each}
        </div>
    </div>
{/snippet}
