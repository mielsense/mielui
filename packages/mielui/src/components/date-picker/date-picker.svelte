<script lang="ts">
    import { DatePicker as DatePickerPrimitive } from 'bits-ui';
    import { untrack } from 'svelte';
    import type { DatePickerProps } from '.';
    import { setDatePickerContext } from './context';

    let {
        value = $bindable(),
        placeholder = $bindable(),
        open = $bindable(false),
        element = $bindable(null),
        locale = 'en-US',
        disabled = false,
        readonly = false,
        required = false,
        fixedWeeks = true,
        disableDaysOutsideMonth = true,
        weekdayFormat = 'short',
        labels,
        children,
        ...rest
    }: DatePickerProps = $props();
    let keptPlaceholder = $state(untrack(() => placeholder));
    const initialValue = untrack(() => value);
    setDatePickerContext({
        get labels() {
            return {
                trigger: labels?.trigger ?? 'Choose date',
                content: labels?.content ?? 'Choose date',
                invalid: labels?.invalid ?? 'Enter a valid date.'
            };
        },
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
    bind:placeholder={
        () => placeholder ?? keptPlaceholder,
        (next) => {
            keptPlaceholder = next;
            placeholder = next;
        }
    }
    bind:open
    {locale}
    {disabled}
    {readonly}
    {required}
    {fixedWeeks}
    {disableDaysOutsideMonth}
    {weekdayFormat}
>
    <div bind:this={element}>
        {@render children?.()}
    </div>
</DatePickerPrimitive.Root>
