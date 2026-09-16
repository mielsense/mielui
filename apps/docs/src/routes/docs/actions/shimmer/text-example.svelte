<script lang="ts">
    import { shimmer } from '@mielui/svelte/actions/shimmer';
</script>

<p role="status" class="text-base text-foreground-muted">
    <span use:shimmer class="inline-block">Thinking…</span>
</p>
