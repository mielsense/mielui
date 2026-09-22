<script lang="ts">
    import { Select as BitsSelect } from 'bits-ui';
    import { SvelteMap } from 'svelte/reactivity';
    import type { SelectProps } from '.';
    import { type SelectContext, setSelectContext } from './context.svelte';

    let {
        children,
        value = $bindable(''),
        open = $bindable(false),
        onValueChange,
        onOpenChange
    }: SelectProps = $props();
    const id = $props.id();
    let triggerId = $state(`${id}-trigger`);
    const labels = new SvelteMap<string, string>();
    const values = new Set<string>();
    const selectionState = {
        get value() {
            return value;
        },
        set value(next: string) {
            value = next;
        },
        get selectedLabel() {
            return labels.get(value) ?? value;
        },
        set selectedLabel(next: string) {
            labels.set(value, next);
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
</script>

<BitsSelect.Root type="single" bind:value bind:open {onValueChange} onOpenChange={updateOpen}>
    {@render children?.()}
</BitsSelect.Root>
