<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
</script>

<Card.Root class="w-full max-w-[28rem]">
    <Card.Header>
        <Card.Title>Settings</Card.Title>
    </Card.Header>
    <Card.Footer>
        <Button variant="outline" size="md">Cancel</Button>
        <Button size="md">Apply</Button>
    </Card.Footer>
</Card.Root>
