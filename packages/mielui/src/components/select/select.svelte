<script lang="ts">
    import { Select as BitsSelect } from 'bits-ui';
    import { SvelteMap } from 'svelte/reactivity';
    import type { SelectProps } from '.';
    import { type SelectContext, setSelectContext } from './context.svelte';

    let {
        children,
        type = 'single',
        value = $bindable(type === 'multiple' ? [] : ''),
        name,
        disabled = false,
        required = false,
        open = $bindable(false),
        onValueChange,
        onOpenChange
    }: SelectProps = $props();
    const singleValue = $derived(typeof value === 'string' ? value : '');
    const multipleValue = $derived(Array.isArray(value) ? value : []);
    const selectedValues = $derived(
        type === 'multiple' ? multipleValue : singleValue ? [singleValue] : []
    );
    const id = $props.id();
    let triggerId = $state(`${id}-trigger`);
    const labels = new SvelteMap<string, string>();
    const values = new Set<string>();
    const selectionState = {
        get value() {
            return type === 'multiple' ? multipleValue : singleValue;
        },
        set value(next: string | string[]) {
            value = next;
        },
        get selectedLabel() {
            return selectedValues.map((item) => labels.get(item) ?? item).join(', ');
        },
        set selectedLabel(next: string) {
            if (type === 'single' && singleValue) {
                labels.set(singleValue, next);
            }
        }
    };
    const context: SelectContext = {
        id,
        get triggerId() {
            return triggerId;
        },
        set triggerId(value) {
            triggerId = value;
        },
        state: selectionState,
        labels,
        values,
        get open() {
            return open;
        },
        setOpen(next) {
            if (next === open) {
                return;
            }
            open = next;
            updateOpen(next);
        }
    };
    setSelectContext(context);

    function updateOpen(next: boolean) {
        if (next) {
            context.onTriggerOpen?.();
        }
        onOpenChange?.(next);
    }
    function updateSingle(next: string) {
        value = next;
        if (type === 'single') {
            (onValueChange as ((value: string) => void) | undefined)?.(next);
        }
    }

    function updateMultiple(next: string[]) {
        value = next;
        if (type === 'multiple') {
            (onValueChange as ((value: string[]) => void) | undefined)?.(next);
        }
    }
</script>

{#if type === 'multiple'}
    <BitsSelect.Root
        type="multiple"
        value={multipleValue}
        bind:open
        onValueChange={updateMultiple}
        onOpenChange={updateOpen}
        {name}
        {disabled}
        {required}
    >
        {@render children?.()}
    </BitsSelect.Root>
{:else}
    <BitsSelect.Root
        type="single"
        value={singleValue}
        bind:open
        onValueChange={updateSingle}
        onOpenChange={updateOpen}
        {name}
        {disabled}
        {required}
    >
        {@render children?.()}
    </BitsSelect.Root>
{/if}
