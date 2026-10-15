<script lang="ts">
    import type { ChartAreaProps } from '.';
    import Path from './path.svelte';

    let props: ChartAreaProps = $props();
</script>

<Path {...props} area />
