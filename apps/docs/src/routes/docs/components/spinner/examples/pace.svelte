<script lang="ts">
    import { Spinner } from '@mielui/svelte/components/spinner';
</script>

<div class="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground-muted">
    <span class="flex items-center gap-2">
        <Spinner aria-hidden="true" />
        <span>Default</span>
    </span>
    <span class="flex items-center gap-2">
        <Spinner speed={2} aria-hidden="true" />
        <span>Twice as fast</span>
    </span>
    <span class="flex items-center gap-2">
        <Spinner eased aria-hidden="true" />
        <span>Eased</span>
    </span>
</div>
