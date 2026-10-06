<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
</script>

<div
    class="w-full rounded-[var(--radius-xl)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--chart-1)_45%,transparent),color-mix(in_oklab,var(--chart-2)_35%,transparent)_45%,color-mix(in_oklab,var(--chart-5)_45%,transparent))] p-8"
>
    <Card.Root variant="inset" surface="glass" class="mx-auto max-w-sm">
        <Card.Header>
            <Card.Title>Weekly digest</Card.Title>
            <Card.Description>A summary of activity in your workspace.</Card.Description>
        </Card.Header>
        <Card.Content>
            <p class="m-0 text-sm text-foreground-muted">
                The frame is frosted, so the backdrop shows through it. The content stays on a solid
                surface.
            </p>
        </Card.Content>
        <Card.Footer>
            <Button variant="ghost">Skip</Button>
            <Button>Subscribe</Button>
        </Card.Footer>
    </Card.Root>
</div>
