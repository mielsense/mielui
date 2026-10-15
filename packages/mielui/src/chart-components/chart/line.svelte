<script lang="ts">
    import type { ChartLineProps } from '.';
    import Path from './path.svelte';

    let props: ChartLineProps = $props();
</script>

<Path {...props} />
