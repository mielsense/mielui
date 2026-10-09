<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { DateRangePicker as DatePickerPrimitive } from 'bits-ui';
    import FormField from '../date-picker/date-picker-form-field.svelte';
    import Segment from '../date-picker/date-picker-segment.svelte';
    import { input } from '../input/variants';

    let {
        class: className,
        name,
        form,
        type,
        children: content,
        ref = $bindable(null),
        ...rest
    }: Omit<DatePickerPrimitive.InputProps, 'child'> & { form?: string } = $props();
</script>

<DatePickerPrimitive.Input
    {...rest}
    {type}
    name=""
    bind:ref
    data-ui="date-range-picker-input"
    class={cn(
        className,
        'inline-flex w-auto min-w-max flex-1 items-center gap-0.5 py-1 has-[:focus]:border-primary has-[:focus]:shadow-[var(--focus-ring)] data-disabled:cursor-not-allowed data-disabled:border-[var(--color-input)] data-disabled:opacity-[var(--opacity-disabled)] data-invalid:border-error data-invalid:has-[:focus]:shadow-[0_0_0_calc(var(--border-size)*3)_color-mix(in_srgb,var(--color-error)_30%,transparent)]',
        input({ variant: 'outline' })
    )}
>
    {#snippet children(data)}
        {#if content}
            {@render content(data)}
        {:else}
            {#each data.segments as segment, index (index)}
                <Segment part={segment.part}>{segment.value}</Segment>
            {/each}
        {/if}
    {/snippet}
</DatePickerPrimitive.Input>

<FormField {name} {form} field={ref} {type} />
