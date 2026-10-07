<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
    import * as Tabs from '@mielui/svelte/components/tabs';

    let position = $state('bottom');
</script>

<div class="flex w-full max-w-sm flex-col gap-4">
    <Tabs.Root bind:value={position} variant="segmented">
        <div role="group" aria-label="Footer position">
            <Tabs.List>
                <Tabs.Trigger value="bottom">Bottom</Tabs.Trigger>
                <Tabs.Trigger value="top">Top</Tabs.Trigger>
            </Tabs.List>
        </div>
    </Tabs.Root>
    <Card.Root
        variant="inset"
        class={position === 'top'
            ? '[--mielui-inset-position:top]'
            : '[--mielui-inset-position:bottom]'}
    >
        <Card.Header>
            <Card.Title>Weekly report</Card.Title>
            <Card.Description>Sent to 14 people every Monday at 9:00.</Card.Description>
        </Card.Header>
        <Card.Content>
            <p class="m-0 text-sm text-foreground-muted">
                The next report covers October 5 to 11 and goes out in three days.
            </p>
        </Card.Content>
        <Card.Footer>
            <span class="me-auto ps-2 text-sm text-foreground-muted">Next: October 12</span>
            <Button variant="outline">Send now</Button>
        </Card.Footer>
    </Card.Root>
</div>
