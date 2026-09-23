<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
</script>

<Card.Root class="w-full max-w-md">
    <Card.Header>
        <div class="flex items-center justify-between gap-3">
            <Card.Title>Team handbook</Card.Title>
            <Badge variant="success">Published</Badge>
        </div>
        <Card.Description>The policies and guides your team uses every day.</Card.Description>
    </Card.Header>
    <Card.Content>
        <dl class="grid grid-cols-2 gap-4 text-sm">
            <div>
                <dt class="text-foreground-muted">Framework</dt>
                <dd class="mt-1">SvelteKit</dd>
            </div>
            <div>
                <dt class="text-foreground-muted">Last update</dt>
                <dd class="mt-1">Today</dd>
            </div>
        </dl>
    </Card.Content>
    <Card.Footer>
        <Button variant="secondary" href="/docs/components/typography">Read the guide</Button>
        <Button href="/studio">Customize theme</Button>
    </Card.Footer>
</Card.Root>
