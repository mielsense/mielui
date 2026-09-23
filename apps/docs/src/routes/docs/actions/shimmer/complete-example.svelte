<script lang="ts">
    import { shimmer } from '@mielui/svelte/actions/shimmer';
    import { Button } from '@mielui/svelte/components/button';

    let loading = $state(true);

    function toggleLoading() {
        loading = !loading;
    }
</script>

<div class="flex flex-col items-start gap-4">
    {#if loading}
        <p role="status" class="text-sm text-foreground-muted">
            <span class="inline-block" use:shimmer>Preparing your export…</span>
        </p>
    {:else}
        <p role="status" class="text-sm">Export ready. 128 records included.</p>
    {/if}
    <Button variant="secondary" onclick={toggleLoading}>
        {loading ? 'Complete export' : 'Prepare again'}
    </Button>
</div>
