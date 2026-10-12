<script lang="ts">
    import { cn, type WithElement } from '@mielui/svelte/utils';
    import { DatePicker as DatePickerPrimitive } from 'bits-ui';
    import { input } from '../input/variants';
    import FormField from './date-picker-form-field.svelte';
    import Segment from './date-picker-segment.svelte';
    import { fieldSegments } from './segments';

    let {
        class: className,
        name,
        form,
        children: content,
        element = $bindable(null),
        ...rest
    }: WithElement<Omit<DatePickerPrimitive.InputProps, 'child'> & { form?: string }> = $props();
</script>

<DatePickerPrimitive.Input
    {...rest}
    name=""
    bind:ref={element}
    data-ui="date-picker-input"
    class={cn(
        className,
        'inline-flex w-auto min-w-max flex-1 items-center gap-0.5 py-1 has-[:focus]:border-primary has-[:focus]:shadow-[var(--focus-ring)] data-disabled:cursor-not-allowed data-disabled:border-[var(--color-input)] data-disabled:opacity-[var(--opacity-disabled)] data-invalid:border-error data-invalid:has-[:focus]:shadow-[0_0_0_calc(var(--border-size)*3)_color-mix(in_srgb,var(--color-error)_30%,transparent)]',
        input({ variant: 'outline' })
    )}
>
    {#snippet children(data)}
        {const segments = fieldSegments(data.segments)}
        {#if content}
            {@render content({ ...data, segments })}
        {:else}
            {#each segments as segment, index (index)}
                <Segment part={segment.part}>{segment.value}</Segment>
            {/each}
        {/if}
    {/snippet}
</DatePickerPrimitive.Input>

<FormField {name} {form} field={element} />
