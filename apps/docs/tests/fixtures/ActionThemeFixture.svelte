<script lang="ts">
    import { shimmer } from '@mielui/svelte/actions/shimmer';
</script>

<div data-testid="action-theme" style="--motion-duration-panel: 180ms">
    <span use:shimmer>Preparing report</span>
</div>
