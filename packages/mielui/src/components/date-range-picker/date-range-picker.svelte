<script lang="ts">
    import { DateRangePicker as DatePickerPrimitive } from 'bits-ui';
    import { untrack } from 'svelte';
    import { setDatePickerContext } from '../date-picker/context.svelte';
    import type { DateRangePickerProps } from '.';

    let {
        value = $bindable(),
        placeholder = $bindable(),
        open = $bindable(false),
        ref = $bindable(null),
        locale = 'en-US',
        disabled = false,
        readonly = false,
        required = false,
        fixedWeeks = true,
        weekdayFormat = 'short',
        children,
        ...rest
    }: DateRangePickerProps = $props();
    const initialValue = untrack(() => ({ start: value?.start, end: value?.end }));
    setDatePickerContext({
        get readonly() {
            return readonly;
        },
        get required() {
            return required;
        },
        getValue(type = 'start') {
            return value?.[type];
        },
        reset() {
            value = { ...initialValue };
            open = false;
        },

        get disabled() {
            return disabled;
        },
        get locale() {
            return locale;
        }
    });
</script>

<DatePickerPrimitive.Root
    {...rest}
    bind:value
    bind:placeholder
    bind:open
    bind:ref
    {locale}
    {disabled}
    {readonly}
    {required}
    {fixedWeeks}
    {weekdayFormat}
>
    {@render children?.()}
</DatePickerPrimitive.Root>
