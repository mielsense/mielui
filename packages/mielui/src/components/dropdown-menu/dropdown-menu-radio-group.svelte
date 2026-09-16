<script lang="ts">
    import { DropdownMenu as MenuPrimitive } from 'bits-ui';
    import type { DropdownMenuRadioGroupProps } from '.';

    let { value = $bindable(''), onValueChange, children }: DropdownMenuRadioGroupProps = $props();
</script>

<MenuPrimitive.RadioGroup bind:value {onValueChange}>
    {@render children?.()}
</MenuPrimitive.RadioGroup>
