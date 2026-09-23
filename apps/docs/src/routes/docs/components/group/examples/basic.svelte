<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Group from '@mielui/svelte/components/group';

    const revisions = ['First draft', 'Edited draft', 'Final draft'];
    let revision = $state(1);
</script>

<div class="flex flex-col items-center gap-4">
    <p class="m-0 text-sm text-foreground-muted" role="status">{revisions[revision]}</p>
    <Group.Root aria-label="Revision history">
        <Button
            variant="outline"
            disabled={revision === 0}
            onclick={() => {
            revision -= 1;
        }}
        >
            Undo
        </Button>
        <Group.Separator />
        <Button
            variant="outline"
            disabled={revision === revisions.length - 1}
            onclick={() => {
            revision += 1;
        }}
        >
            Redo
        </Button>
    </Group.Root>
</div>
