<script lang="ts">
    import { ShowMore } from '@mielui/svelte/components/show-more';

    const paragraphs = [
        'The workspace migration is scheduled for Tuesday at 09:00 UTC. Your projects, comments, and uploaded files will move together. Read-only access remains available during the transfer.',
        'Before the migration, export any reports needed for the morning meeting. Scheduled jobs will pause for up to fifteen minutes and resume after the new workspace passes its health checks.',
        'If a check fails, the team will restore the previous workspace and notify its owners. Existing links will continue to work after the transfer.'
    ];
</script>

<div class="w-full max-w-md">
    <ShowMore lines={2} label="Migration details">
        <div class="flex flex-col gap-2">
            {#each paragraphs as paragraph (paragraph)}
                <p>{paragraph}</p>
            {/each}
        </div>
    </ShowMore>
</div>
