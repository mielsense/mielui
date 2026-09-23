<script lang="ts">
    import Axis from './axis.svelte';

    let props: { class?: string; ticks?: number; format?: (value: string | number) => string } =
        $props();
</script>
<Axis axis="y" {...props} />
