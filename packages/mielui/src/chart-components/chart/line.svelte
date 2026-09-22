<script lang="ts">
    import Path from './path.svelte';

    let props: { key: string; class?: string; strokeWidth?: number } = $props();
</script>
<Path {...props} />
