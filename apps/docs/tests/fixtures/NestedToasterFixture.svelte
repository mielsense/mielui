<script lang="ts">
    import { Toaster } from '@mielui/svelte/components/toast';

    let { showNested = true }: { showNested?: boolean } = $props();
</script>

<Toaster />
{#if showNested}
    <Toaster />
{/if}
