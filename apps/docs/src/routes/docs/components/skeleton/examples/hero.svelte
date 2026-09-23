<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { SkeletonSwap } from '@mielui/svelte/components/skeleton';
    import { onDestroy } from 'svelte';

    let ready = $state(true);
    let timer: ReturnType<typeof setTimeout> | undefined;
    function reload() {
        clearTimeout(timer);
        ready = false;
        timer = setTimeout(() => {
            ready = true;
        }, 1200);
    }
    onDestroy(() => {
        clearTimeout(timer);
    });
</script>

<div class="flex w-full max-w-sm flex-col gap-4">
    <SkeletonSwap {ready} lines={3} lineHeight={24} label="Workspace summary">
        {#if ready}
            <p class="text-sm leading-6 text-foreground-muted">
                Your workspace has 12 active projects. Three are ready for review, and the next team
                check-in is on Friday.
            </p>
        {/if}
    </SkeletonSwap>
    <Button variant="secondary" onclick={reload} disabled={!ready}>Reload summary</Button>
</div>
