<script lang="ts">
    import type { NativeSelectOptionProps } from '.';

    let { children, ...rest }: NativeSelectOptionProps = $props();
</script>

<option {...rest} data-ui="native-select-option">
    {@render children?.()}
</option>
