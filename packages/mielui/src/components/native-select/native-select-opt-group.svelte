<script lang="ts">
    import type { NativeSelectOptGroupProps } from '.';

    let { children, ...rest }: NativeSelectOptGroupProps = $props();
</script>

<optgroup {...rest} data-ui="native-select-opt-group">
    {@render children?.()}
</optgroup>
