<script lang="ts">
    import { shimmer } from '@mielui/svelte/actions/shimmer';
</script>

<div class="w-64 space-y-3" aria-label="Loading profile" role="status">
    <div use:shimmer class="h-12 w-12 rounded-full bg-secondary"></div>
    <div use:shimmer class="h-4 rounded-md bg-secondary"></div>
    <div use:shimmer class="h-4 w-2/3 rounded-md bg-secondary"></div>
    <span class="sr-only">Loading profile…</span>
</div>
