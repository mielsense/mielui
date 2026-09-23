<script lang="ts">
    import { DatePicker as DatePickerPrimitive } from 'bits-ui';
    import { untrack } from 'svelte';
    import { setDatePickerContext } from '../date-picker/context.svelte';
    import type { DatePickerProps } from '.';

    let {
        value = $bindable(),
        placeholder = $bindable(),
        open = $bindable(false),
        locale = 'en-US',
        disabled = false,
        readonly = false,
        required = false,
        fixedWeeks = true,
        weekdayFormat = 'short',
        children,
        ...rest
    }: DatePickerProps = $props();
    const initialValue = untrack(() => value);
    setDatePickerContext({
        get readonly() {
            return readonly;
        },
        get required() {
            return required;
        },
        getValue() {
            return value;
        },
        reset() {
            value = initialValue;
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
    {locale}
    {disabled}
    {readonly}
    {required}
    {fixedWeeks}
    {weekdayFormat}
>
    {@render children?.()}
</DatePickerPrimitive.Root>
