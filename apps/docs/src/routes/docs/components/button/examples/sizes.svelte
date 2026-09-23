<script lang="ts">
    import { FavouriteIcon as Heart } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="flex flex-wrap items-center justify-center gap-4">
    <Button size="sm">Small</Button>
    <Button>Medium</Button>
    <Button size="lg">Large</Button>
    <Tooltip.Root>
        <Tooltip.Trigger>
            <Button size="icon" aria-label="Favorite">
                <HugeiconsIcon icon={Heart} size={14} />
            </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Favorite</Tooltip.Content>
    </Tooltip.Root>
</div>
