<script lang="ts">
    import { Combobox as ComboboxPrimitive } from 'bits-ui';
    import type { ComboboxRootProps } from '.';
    import { setComboboxContext, setComboboxLabels } from './context';
    import { createComboboxController } from './controller.svelte';

    let {
        children,
        open = $bindable(false),
        value = $bindable<string | string[] | undefined>(undefined),
        onOpenChange,
        placement = 'bottom',
        inert = true,
        hoverable = false,
        delay = 0,
        closeDelay = 150,
        labels,
        ...selection
    }: ComboboxRootProps = $props();

    setComboboxLabels(() => labels);

    const id = $props.id();
    const controller = createComboboxController({
        get value() {
            return value;
        },
        get multiple() {
            return selection.type === 'multiple';
        },
        set value(next) {
            if (selection.type === 'multiple' && Array.isArray(next)) {
                value = next;
                selection.onValueChange?.(next);
            } else if (selection.type !== 'multiple' && typeof next === 'string') {
                value = next;
                selection.onValueChange?.(next);
            }
        },
        get open() {
            return open;
        },
        set open(next) {
            open = next;
            onOpenChange?.(next);
        },
        get placement() {
            return placement;
        },
        get inert() {
            return inert;
        },
        get hoverable() {
            return hoverable;
        },
        get delay() {
            return Math.max(0, delay);
        },
        get closeDelay() {
            return Math.max(0, closeDelay);
        }
    });
    const context = Object.assign(controller, { id });
    setComboboxContext(context);

    function getValue() {
        return typeof value === 'string' ? value : '';
    }

    function getValues() {
        return Array.isArray(value) ? value : [];
    }

    function getOpen() {
        return open;
    }
</script>

{#if selection.type === 'multiple'}
    <ComboboxPrimitive.Root
        type="multiple"
        bind:value={getValues, controller.commitValues}
        bind:open={getOpen, controller.setOpen}
        inputValue={controller.inputValue}
        items={controller.items}
        disabled={controller.disabled}
        name={controller.name}
        loop
    >
        {@render children?.()}
    </ComboboxPrimitive.Root>
{:else}
    <ComboboxPrimitive.Root
        type="single"
        bind:value={getValue, controller.commitValue}
        bind:open={getOpen, controller.setOpen}
        inputValue={controller.inputValue}
        items={controller.items}
        disabled={controller.disabled}
        name={controller.name}
        allowDeselect={false}
        loop
    >
        {@render children?.()}
    </ComboboxPrimitive.Root>
{/if}
