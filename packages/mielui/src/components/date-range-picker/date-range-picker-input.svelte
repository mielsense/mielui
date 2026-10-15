<script lang="ts">
    import { cn, type WithElement } from '@mielui/svelte/utils';
    import { DateRangePicker as DatePickerPrimitive } from 'bits-ui';
    import FormField from '../date-picker/date-picker-form-field.svelte';
    import Segment from '../date-picker/date-picker-segment.svelte';
    import { fieldSegments } from '../date-picker/segments';
    import { dateFieldClasses } from '../date-picker/variants';
    import { input } from '../input/variants';

    let {
        class: className,
        name,
        form,
        type,
        children: content,
        element = $bindable(null),
        ...rest
    }: WithElement<Omit<DatePickerPrimitive.InputProps, 'child'> & { form?: string }> = $props();
</script>

<DatePickerPrimitive.Input
    {...rest}
    {type}
    name=""
    bind:ref={element}
    data-ui="date-range-picker-input"
    class={cn(
        className,
        dateFieldClasses,
        input({ variant: 'outline' })
    )}
>
    {#snippet children(data)}
        {const segments = $derived(fieldSegments(data.segments))}
        {#if content}
            {@render content({ ...data, segments })}
        {:else}
            {#each segments as segment, index (index)}
                <Segment part={segment.part}>{segment.value}</Segment>
            {/each}
        {/if}
    {/snippet}
</DatePickerPrimitive.Input>

<FormField {name} {form} field={element} {type} />
