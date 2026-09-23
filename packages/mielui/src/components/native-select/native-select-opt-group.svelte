<script lang="ts">
    import type { HTMLOptgroupAttributes } from 'svelte/elements';

    let { children, ...rest }: HTMLOptgroupAttributes = $props();
</script>

<optgroup {...rest} data-ui="native-select-opt-group">
    {@render children?.()}
</optgroup>
