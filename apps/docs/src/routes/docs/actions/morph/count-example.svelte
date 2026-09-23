<script lang="ts">
    import { morph } from '@mielui/svelte/actions/morph';
    import { Button } from '@mielui/svelte/components/button';

    let count = $state(1);

    function addSeat() {
        count += 1;
    }
</script>

<div class="flex items-center gap-4">
    <Button variant="secondary" onclick={addSeat}>Add seat</Button>
    <span class="inline-flex items-baseline gap-2" aria-live="polite">
        <span class="inline-block w-8 text-center tabular-nums" use:morph={{ key: count }}>
            {count}
        </span>
        <span class="text-sm text-foreground-muted">seats selected</span>
    </span>
</div>
