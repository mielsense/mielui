<script lang="ts">
    import { Skeleton } from '@mielui/svelte/components/skeleton';
</script>

<div class="w-64 space-y-3" role="status" aria-label="Loading profile">
    <Skeleton variant="shimmer" class="size-12 rounded-full" />
    <Skeleton variant="shimmer" class="h-4 w-full" />
    <Skeleton variant="shimmer" class="h-4 w-2/3" />
    <span class="sr-only">Loading profile…</span>
</div>
