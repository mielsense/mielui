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
        value = $bindable<string | undefined>(undefined),
        onValueChange,
        onOpenChange,
        placement = 'bottom',
        inert = true,
        hoverable = false,
        delay = 0,
        closeDelay = 150
    }: ComboboxRootProps = $props();

    const generatedKey = $props.id();
    const id = untrack(() => stateKey ?? state_key ?? generatedKey);
    const controller = createComboboxController({
        getValue() {
            return value;
        },
        setValue(next) {
            value = next;
            onValueChange?.(next);
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
        return value ?? '';
    }

    function getOpen() {
        return open;
    }
</script>

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
