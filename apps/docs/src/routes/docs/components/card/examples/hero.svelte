<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
    import { Progress } from '@mielui/svelte/components/progress';

    const total = 24;
    const start = 18;

    let done = $state(start);

    const percent = $derived(Math.round((done / total) * 100));
    const finished = $derived(done === total);
</script>

<Card.Root class="w-full max-w-md">
    <Card.Header>
        <div class="flex items-center justify-between gap-3">
            <Card.Title>Checkout redesign</Card.Title>
            <Badge variant={finished ? 'success' : 'info'}>
                {finished ? 'Shipped' : 'In progress'}
            </Badge>
        </div>
        <Card.Description>A shorter payment flow for the web and mobile stores.</Card.Description>
    </Card.Header>
    <Card.Content class="gap-5">
        <div class="grid gap-2">
            <div class="flex items-baseline justify-between gap-3 text-sm">
                <span class="text-foreground-muted">{done} of {total} tasks done</span>
                <span class="tabular-nums">{percent}%</span>
            </div>
            <Progress value={done} max={total} aria-label="Tasks done" />
        </div>
        <dl class="m-0 grid grid-cols-2 gap-4 text-sm">
            <div>
                <dt class="text-foreground-muted">Lead</dt>
                <dd class="m-0 mt-1">Ines Moreau</dd>
            </div>
            <div>
                <dt class="text-foreground-muted">Due</dt>
                <dd class="m-0 mt-1">October 30</dd>
            </div>
        </dl>
    </Card.Content>
    <Card.Footer>
        <Button
            variant="outline"
            disabled={done === start}
            onclick={() => {
                done = start;
            }}
        >
            Reset
        </Button>
        <Button
            disabled={finished}
            onclick={() => {
                done += 1;
            }}
        >
            Complete a task
        </Button>
    </Card.Footer>
</Card.Root>
