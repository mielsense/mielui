<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
</script>

<Tooltip.Provider>
    <Tooltip.Root>
        <Tooltip.Trigger>
            <Button variant="outline">Sync status</Button>
        </Tooltip.Trigger>
        <Tooltip.Content rich>
            <span class="flex items-center gap-2">
                <span aria-hidden="true" class="size-1.5 rounded-full bg-success"></span>
                <span><strong>Synced</strong> · just now</span>
            </span>
        </Tooltip.Content>
    </Tooltip.Root>
</Tooltip.Provider>
