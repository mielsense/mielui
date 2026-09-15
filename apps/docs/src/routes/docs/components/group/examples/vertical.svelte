<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Group from '@mielui/svelte/components/group';
</script>

<Group.Root orientation="vertical" aria-label="Zoom">
    <Button variant="outline">Zoom in</Button>
    <Group.Separator orientation="horizontal" />
    <Button variant="outline">Zoom out</Button>
</Group.Root>
