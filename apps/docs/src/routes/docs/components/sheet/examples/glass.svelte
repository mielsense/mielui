<script lang="ts">
    import * as Sheet from '@mielui/svelte/components/sheet';
    import { Switch } from '@mielui/svelte/components/switch';

    let compact = $state(false);
    let reduceMotion = $state(false);
</script>

<Sheet.Root>
    <Sheet.Trigger variant="outline">Display settings</Sheet.Trigger>
    <Sheet.Content surface="glass">
        <Sheet.Header>
            <Sheet.Title>Display</Sheet.Title>
            <Sheet.Description>The page stays visible through the panel.</Sheet.Description>
        </Sheet.Header>
        <div class="flex flex-col gap-3">
            <Switch bind:checked={compact} label="Compact rows" />
            <Switch bind:checked={reduceMotion} label="Reduce motion" />
        </div>
        <Sheet.Footer>
            <Sheet.Close>Done</Sheet.Close>
        </Sheet.Footer>
    </Sheet.Content>
</Sheet.Root>
