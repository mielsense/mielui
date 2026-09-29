<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { DatePicker as DatePickerPrimitive } from 'bits-ui';
    import FormField from '../date-picker/date-picker-form-field.svelte';
    import Segment from '../date-picker/date-picker-segment.svelte';
    import { input } from '../input/variants';

    let {
        class: className,
        name,
        form,
        children: content,
        ref = $bindable(null),
        ...rest
    }: Omit<DatePickerPrimitive.InputProps, 'child'> & { form?: string } = $props();
</script>

<DatePickerPrimitive.Input
    {...rest}
    name=""
    bind:ref
    data-ui="date-picker-input"
    class={cn(className, input({ variant: 'outline' }), 'inline-flex w-auto min-w-max flex-1 items-center gap-0.5 py-1 focus-within:shadow-[var(--focus-ring)] data-disabled:opacity-[var(--opacity-disabled)] data-invalid:border-error')}
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

<FormField {name} {form} field={ref} />
