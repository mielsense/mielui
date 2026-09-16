<script lang="ts">
    import Settings01Icon from '@hugeicons/core-free-icons/Settings01Icon';
    import { Button } from '@mielui/svelte/components/button';
    import * as Group from '@mielui/svelte/components/group';
    import { Input } from '@mielui/svelte/components/input';
    import * as Popover from '@mielui/svelte/components/popover';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let width = $state<string | number | boolean | FileList | undefined>('1200');
    let open = $state(false);
    let message = $state('');
</script>

<div class="flex flex-col items-center gap-3">
    <Popover.Root bind:open placement="bottom-end">
        <Group.Root aria-label="Export image">
            <Button variant="outline" onclick={() => { message = `Export ready at ${width}px.`; }}>
                Export
            </Button>
            <Group.Separator />
            <Popover.Trigger variant="outline" aria-label="Export settings" class="px-2">
                <HugeiconsIcon icon={Settings01Icon} size={16} />
            </Popover.Trigger>
        </Group.Root>
        <Popover.Content class="w-64" aria-label="Export settings">
            <div class="flex flex-col gap-3 p-3">
                <Input label="Width in pixels" type="number" min={1} bind:value={width} />
                <Button variant="outline" onclick={() => { open = false; }}>Done</Button>
            </div>
        </Popover.Content>
    </Popover.Root>
    <p role="status" class="min-h-5 text-sm text-foreground-muted">{message}</p>
</div>
