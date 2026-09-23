<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
    import { Switch } from '@mielui/svelte/components/switch';

    let message = $state('');
    let notifications = $state(true);
    let saved = $state(true);
    function save() {
        saved = notifications;
        message = 'Workspace preferences saved for this preview.';
    }
    function cancel() {
        notifications = saved;
        message = 'Changes discarded.';
    }
</script>

<Card.Root class="w-full max-w-[28rem]">
    <Card.Header>
        <Card.Title>Account settings</Card.Title>
        <Card.Description>Manage your workspace settings.</Card.Description>
    </Card.Header>
    <Card.Content>
        <p class="m-0 text-sm leading-relaxed text-foreground-muted">
            Currently on the Team plan. 12 of 25 seats used.
        </p>
        <Switch bind:checked={notifications} label="Weekly workspace summary" />
    </Card.Content>
    <Card.Footer>
        <Button variant="outline" size="md" onclick={cancel}>Cancel</Button>
        <Button size="md" onclick={save}>Save changes</Button>
    </Card.Footer>
    <p role="status" class="px-5 pb-4 text-sm text-foreground-muted">{message}</p>
</Card.Root>
