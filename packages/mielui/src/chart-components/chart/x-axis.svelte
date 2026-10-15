<script lang="ts">
    import type { ChartXAxisProps } from '.';
    import Axis from './axis.svelte';

    let props: ChartXAxisProps = $props();
</script>

<Axis axis="x" {...props} />
