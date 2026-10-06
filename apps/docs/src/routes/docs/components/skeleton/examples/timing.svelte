<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { Skeleton, SkeletonSwap } from '@mielui/svelte/components/skeleton';
    import { onDestroy } from 'svelte';

    let ready = $state(true);
    let timer: ReturnType<typeof setTimeout> | undefined;

    function load(duration: number) {
        clearTimeout(timer);
        ready = false;
        timer = setTimeout(() => {
            ready = true;
        }, duration);
    }

    onDestroy(() => {
        clearTimeout(timer);
    });
</script>

<div class="flex w-full max-w-sm flex-col gap-4">
    <SkeletonSwap {ready} lines={2} barHeight={12} reserve={56} delay={200} minVisible={600}>
        {#if ready}
            <p class="text-sm leading-6 text-foreground-muted">
                Three invoices are overdue. The oldest is from Kestrel Logistics.
            </p>
        {/if}
    </SkeletonSwap>
    <Skeleton w={60} h={0.75} unit="%" />
    <div class="flex gap-2">
        <Button variant="outline" onclick={() => load(100)}>Load in 100 ms</Button>
        <Button variant="outline" onclick={() => load(1500)}>Load in 1.5 s</Button>
    </div>
</div>
