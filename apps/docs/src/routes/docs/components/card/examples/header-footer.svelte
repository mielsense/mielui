<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';

    let message = $state('');
    function save() {
        message = 'Workspace preferences saved for this preview.';
    }
    function cancel() {
        message = 'No changes applied.';
    }
</script>

<Card.Root class="w-full max-w-[28rem]">
    <Card.Header>
        <Card.Title>Settings</Card.Title>
    </Card.Header>
    <Card.Footer>
        <Button variant="outline" size="md" onclick={cancel}>Cancel</Button>
        <Button size="md" onclick={save}>Apply</Button>
    </Card.Footer>
    <p role="status" class="px-5 pb-4 text-sm text-foreground-muted">{message}</p>
</Card.Root>
