<script lang="ts">
    import { ShowMore } from '@mielui/svelte/components/show-more';

    const entries = [
        '09:00 — Paused scheduled reports and confirmed the latest backup.',
        '09:03 — Copied project records into the new workspace.',
        '09:06 — Verified uploaded files against their stored checksums.',
        '09:08 — Restored team roles and notification preferences.',
        '09:11 — Ran a sample export and checked the downloaded report.',
        '09:14 — Resumed scheduled jobs. Workspace owners can continue editing.'
    ];
</script>

<ShowMore lines={2} maxHeight={112} label="Migration activity">
    <div class="flex flex-col gap-2">
        {#each entries as entry (entry)}
            <p>{entry}</p>
        {/each}
    </div>
</ShowMore>
