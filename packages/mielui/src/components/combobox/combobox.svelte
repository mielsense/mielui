<script lang="ts">
    import { Combobox as ComboboxPrimitive } from 'bits-ui';
    import { untrack } from 'svelte';
    import type { ComboboxRootProps } from '.';
    import { setComboboxContext } from './context.svelte';
    import { createComboboxController } from './controller.svelte';

    let {
        children,
        state_key,
        stateKey,
        open = $bindable(false),
        value = $bindable<string | string[] | undefined>(undefined),
        onOpenChange,
        placement = 'bottom',
        inert = true,
        hoverable = false,
        delay = 0,
        closeDelay = 150,
        ...selection
    }: ComboboxRootProps = $props();

    const generatedKey = $props.id();
    const id = untrack(() => stateKey ?? state_key ?? generatedKey);
    const controller = createComboboxController({
        getValue() {
            return value;
        },
        getMultiple() {
            return selection.type === 'multiple';
        },
        setValue(next) {
            if (selection.type === 'multiple' && Array.isArray(next)) {
                value = next;
                selection.onValueChange?.(next);
            } else if (selection.type !== 'multiple' && typeof next === 'string') {
                value = next;
                selection.onValueChange?.(next);
            }
        },
        getOpen() {
            return open;
        },
        setOpen(next) {
            open = next;
            onOpenChange?.(next);
        },
        getPlacement() {
            return placement;
        },
        getInert() {
            return inert;
        },
        getHoverable() {
            return hoverable;
        },
        getDelay() {
            return Math.max(0, delay);
        },
        getCloseDelay() {
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
