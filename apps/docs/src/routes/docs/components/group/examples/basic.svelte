<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Group from '@mielui/svelte/components/group';
</script>

<Group.Root aria-label="History">
    <Button variant="outline">Undo</Button>
    <Group.Separator />
    <Button variant="outline">Redo</Button>
</Group.Root>
