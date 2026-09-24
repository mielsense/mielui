<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Button } from '@mielui/svelte/components/button';
    import * as Group from '@mielui/svelte/components/group';

    let zoom = $state(100);
</script>

<div class="flex items-center gap-6">
    <Group.Root orientation="vertical" aria-label="Zoom">
        <Button
            variant="outline"
            disabled={zoom === 200}
            onclick={() => {
            zoom += 25;
        }}
        >
            Zoom in
        </Button>
        <Group.Separator orientation="horizontal" />
        <Button
            variant="outline"
            disabled={zoom === 50}
            onclick={() => {
            zoom -= 25;
        }}
        >
            Zoom out
        </Button>
    </Group.Root>
    <output class="min-w-14 text-sm text-foreground-muted tabular-nums" aria-label="Zoom level">
        <span use:numberShuffle={{ value: zoom }}>{zoom}</span>
        %
    </output>
</div>
