<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
    import * as Card from '@mielui/svelte/components/card';
</script>

<Card.Root class="w-full max-w-xs">
    <Card.Content class="gap-2">
        <span class="text-sm text-foreground-muted">Monthly recurring revenue</span>
        <div class="flex items-center gap-3">
            <span class="text-3xl font-semibold tabular-nums">$48,200</span>
            <Badge variant="success">+12.4%</Badge>
        </div>
        <span class="text-sm text-foreground-muted">Up from $42,900 in August</span>
    </Card.Content>
</Card.Root>
