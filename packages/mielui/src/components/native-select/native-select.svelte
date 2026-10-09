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
            'w-full min-w-0 border-[length:var(--border-size)] border-[var(--color-input)] bg-[var(--color-field)] text-[length:var(--font-size-body)] text-[var(--color-field-foreground)] [color-scheme:light] dark:[color-scheme:dark] transition-[background-color,border-color,box-shadow] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none hover:border-[var(--color-border-strong)] focus-visible:border-primary focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:border-[var(--color-input)] disabled:opacity-[var(--opacity-disabled)] aria-invalid:border-error aria-invalid:focus-visible:border-error aria-invalid:focus-visible:shadow-[0_0_0_calc(var(--border-size)*3)_color-mix(in_srgb,var(--color-error)_30%,transparent)]',
            multiple || (size != null && size > 1)
                ? 'min-h-24 appearance-auto rounded-[var(--radius-xl)] px-2 py-2'
                : 'h-[calc(var(--size-control-md)-var(--size-hairline))] appearance-none rounded-[var(--radius-control)] ps-[calc(var(--spacing)*3.5)] pe-10'
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
            class="pointer-events-none absolute end-[calc(var(--spacing)*3.5)] top-1/2 -translate-y-1/2 text-foreground-muted"
        />
    </span>
{/if}
