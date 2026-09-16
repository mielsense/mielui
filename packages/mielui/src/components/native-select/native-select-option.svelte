<script lang="ts">
    import type { HTMLOptionAttributes } from 'svelte/elements';

    let { children, ...rest }: Omit<HTMLOptionAttributes, 'value'> & { value?: string } = $props();
</script>

<option {...rest} data-ui="native-select-option">
    {@render children?.()}
</option>
