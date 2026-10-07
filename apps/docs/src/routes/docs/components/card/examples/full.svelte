<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
    import { Switch } from '@mielui/svelte/components/switch';

    type Preferences = {
        mentions: boolean;
        summary: boolean;
        news: boolean;
    };

    let saved = $state<Preferences>({
        mentions: true,
        summary: true,
        news: false
    });
    let draft = $state<Preferences>({
        mentions: true,
        summary: true,
        news: false
    });
    let status = $state('');

    const dirty = $derived(
        draft.mentions !== saved.mentions ||
            draft.summary !== saved.summary ||
            draft.news !== saved.news
    );

    function save() {
        saved = { ...draft };
        status = 'Saved';
    }

    function discard() {
        draft = { ...saved };
        status = 'Changes discarded';
    }
</script>

<Card.Root class="w-full max-w-md">
    <Card.Header>
        <Card.Title>Email notifications</Card.Title>
        <Card.Description>Choose what reaches your inbox.</Card.Description>
    </Card.Header>
    <Card.Content class="gap-4">
        <Switch
            bind:checked={draft.mentions}
            label="Mentions"
            description="When someone mentions you in a comment."
        />
        <Switch
            bind:checked={draft.summary}
            label="Weekly summary"
            description="Activity across your projects, every Monday."
        />
        <Switch
            bind:checked={draft.news}
            label="Product news"
            description="New features, about once a month."
        />
    </Card.Content>
    <Card.Footer>
        <span role="status" class="me-auto text-sm text-foreground-muted">
            {dirty ? 'Unsaved changes' : status}
        </span>
        <Button variant="outline" disabled={!dirty} onclick={discard}>Discard</Button>
        <Button disabled={!dirty} onclick={save}>Save</Button>
    </Card.Footer>
</Card.Root>
