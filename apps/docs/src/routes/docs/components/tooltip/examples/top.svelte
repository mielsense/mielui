<script lang="ts">
    import { InformationCircleIcon as Info } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<Tooltip.Root placement="top">
    <Tooltip.Trigger>
        <Button variant="outline">
            <HugeiconsIcon icon={Info} size={14} />
            Top
        </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>Appears above the trigger</Tooltip.Content>
</Tooltip.Root>
