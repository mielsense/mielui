<script lang="ts">
    import { cn, type WithElement } from '@mielui/svelte/utils';
    import { DatePicker as DatePickerPrimitive } from 'bits-ui';
    import { input } from '../input/variants';
    import FormField from './date-picker-form-field.svelte';
    import Segment from './date-picker-segment.svelte';
    import { fieldSegments } from './segments';
    import { dateFieldClasses } from './variants';

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

<FormField {name} {form} field={element} />
