<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';

    const stats = [
        { label: 'Merged', value: 14 },
        { label: 'Reviews', value: 9 },
        { label: 'Deploys', value: 6 }
    ];

    let subscribed = $state(false);
</script>

<div
    class="w-full rounded-[var(--radius-xl)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--chart-1)_45%,transparent),color-mix(in_oklab,var(--chart-2)_35%,transparent)_45%,color-mix(in_oklab,var(--chart-5)_45%,transparent))] p-8"
>
    <Card.Root variant="inset" surface="glass" class="mx-auto max-w-sm">
        <Card.Header>
            <Card.Title>Weekly digest</Card.Title>
            <Card.Description>What your team shipped from October 5 to 11.</Card.Description>
        </Card.Header>
        <Card.Content>
            <dl class="m-0 grid grid-cols-3 gap-4">
                {#each stats as stat (stat.label)}
                    <div class="flex flex-col-reverse gap-1">
                        <dt class="text-sm text-foreground-muted">{stat.label}</dt>
                        <dd class="m-0 text-2xl font-semibold">{stat.value}</dd>
                    </div>
                {/each}
            </dl>
        </Card.Content>
        <Card.Footer>
            <span role="status" class="me-auto ps-2 text-sm text-foreground-muted">
                {subscribed ? 'Sent every Monday' : 'Not subscribed'}
            </span>
            <Button
                variant={subscribed ? 'outline' : 'primary'}
                onclick={() => {
                    subscribed = !subscribed;
                }}
            >
                {subscribed ? 'Unsubscribe' : 'Subscribe'}
            </Button>
        </Card.Footer>
    </Card.Root>
</div>
