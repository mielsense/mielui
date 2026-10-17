<script lang="ts">
    import type { ChartYAxisProps } from '.';
    import Axis from './axis.svelte';

    let props: ChartYAxisProps = $props();
</script>

<Axis axis="y" {...props} />
