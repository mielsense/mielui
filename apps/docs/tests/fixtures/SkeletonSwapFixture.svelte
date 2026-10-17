<script lang="ts">
    import { SkeletonSwap, type SkeletonSwapLabels } from '@mielui/svelte/components/skeleton';

    let {
        ready = false,
        labels
    }: {
        ready?: boolean;
        labels?: SkeletonSwapLabels;
    } = $props();
</script>

<SkeletonSwap {ready} delay={20} minVisible={40} lines={2} label="Profile" {labels}>
    <p>Loaded profile</p>
</SkeletonSwap>
