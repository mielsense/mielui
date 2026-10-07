<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
    import * as Card from '@mielui/svelte/components/card';

    const details = [
        { label: 'Branch', value: 'main' },
        { label: 'Commit', value: '4f2a91c' },
        { label: 'Build time', value: '48s' },
        { label: 'Region', value: 'Paris' }
    ];
</script>

<Card.Root variant="panel" class="w-full max-w-sm">
    <Card.Header>
        <div class="flex items-center justify-between gap-3">
            <Card.Title>Latest deploy</Card.Title>
            <Badge variant="success" dot>Ready</Badge>
        </div>
        <Card.Description>Published 4 minutes ago by Theo Martin.</Card.Description>
    </Card.Header>
    <Card.Content>
        <dl class="m-0 grid gap-2.5 text-sm">
            {#each details as detail (detail.label)}
                <div class="flex items-baseline justify-between gap-4">
                    <dt class="text-foreground-muted">{detail.label}</dt>
                    <dd class="m-0 font-mono tabular-nums">{detail.value}</dd>
                </div>
            {/each}
        </dl>
    </Card.Content>
</Card.Root>
