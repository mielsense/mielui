<script lang="ts">
    import { Select as BitsSelect } from 'bits-ui';
    import { SvelteMap } from 'svelte/reactivity';
    import type { SelectProps } from '.';
    import { type SelectContext, setSelectContext } from './context';

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
    const selectedValues = $derived.by(() => {
        if (type === 'multiple') {
            return multipleValue;
        }

        return singleValue ? [singleValue] : [];
    });
    const id = $props.id();
    let triggerId = $state(`${id}-trigger`);
    const labels = new SvelteMap<string, string>();
    const selectionState = {
        get value() {
            return type === 'multiple' ? multipleValue : singleValue;
        },
        get selectedLabel() {
            return selectedValues.map((item) => labels.get(item) ?? item).join(', ');
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
