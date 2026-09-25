<script lang="ts">
    import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLSelectAttributes } from 'svelte/elements';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';

    type Props = Omit<HTMLSelectAttributes, 'value' | 'multiple'> &
        ({ multiple?: false; value?: string } | { multiple: true; value?: string[] });
    let {
        children,
        class: className,
        multiple = false,
        size,
        value = $bindable<string | string[] | undefined>(),
        ...rest
    }: Props = $props();
    const classes = $derived(
        cn(
            className,
            'w-full min-w-0 rounded-[var(--radius-lg)] border-[length:var(--border-size)] border-[var(--color-input)] bg-[var(--color-field)] px-3 text-[length:var(--font-size-body)] text-[var(--color-field-foreground)] [color-scheme:light] dark:[color-scheme:dark] shadow-[var(--elevation-control-edge)] transition-[background-color,border-color,box-shadow] ease-[var(--ease-press)] enabled:hover:bg-[var(--color-field-hover)] [transition-duration:var(--motion-duration-press)] motion-reduce:transition-none focus-visible:border-primary focus-visible:outline-none focus-visible:shadow-[var(--focus-ring),var(--elevation-control-edge)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)] aria-invalid:border-[var(--color-error)]',
            multiple || (size != null && size > 1)
                ? 'min-h-24 appearance-auto py-1'
                : 'h-[var(--size-control-md)] appearance-none pe-10'
        )
    );
</script>

{#if multiple}
    <select {...rest} {size} multiple bind:value data-ui="native-select" class={classes}>
        {@render children?.()}
    </select>
{:else if size != null && size > 1}
    <select {...rest} {size} bind:value data-ui="native-select" class={classes}>
        {@render children?.()}
    </select>
{:else}
    <span class="relative inline-flex w-full min-w-0">
        <select {...rest} {size} bind:value data-ui="native-select" class={classes}>
            {@render children?.()}
        </select>
        <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={16}
            aria-hidden="true"
            class="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-foreground-muted"
        />
    </span>
{/if}
