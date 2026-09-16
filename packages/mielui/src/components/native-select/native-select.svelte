<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLSelectAttributes } from 'svelte/elements';

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
            'w-full min-w-0 appearance-auto rounded-[var(--radius-lg)] border-[length:var(--border-size)] border-[var(--color-input)] bg-[var(--color-field)] px-3 text-[length:var(--font-size-body)] text-[var(--color-field-foreground)] [color-scheme:light] dark:[color-scheme:dark] transition-[border-color,box-shadow] [transition-duration:var(--motion-duration-press)] motion-reduce:transition-none focus-visible:border-primary focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)] aria-invalid:border-[var(--color-error)]',
            multiple || (size !== undefined && size > 1)
                ? 'min-h-24 py-1'
                : 'h-[var(--size-control-md)]'
        )
    );
</script>

{#if multiple}
    <select {...rest} {size} multiple bind:value data-ui="native-select" class={classes}>
        {@render children?.()}
    </select>
{:else}
    <select {...rest} {size} bind:value data-ui="native-select" class={classes}>
        {@render children?.()}
    </select>
{/if}
