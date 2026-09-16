<script lang="ts">
    import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import * as Group from '@mielui/svelte/components/group';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let action = $state('Save draft');
    let message = $state('');
</script>

<div class="flex flex-col items-center gap-3">
    <DropdownMenu.Root>
        <Group.Root aria-label="Save options">
            <Button
                variant="outline"
                onclick={() => { message = action === 'Save draft' ? 'Draft saved.' : 'Changes published.'; }}
            >
                {action}
            </Button>
            <Group.Separator />
            <DropdownMenu.Trigger variant="outline" aria-label="Choose save action" class="px-2">
                <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
            </DropdownMenu.Trigger>
        </Group.Root>
        <DropdownMenu.Content>
            <DropdownMenu.Item callback={() => { action = 'Save draft'; }}>
                Save draft
            </DropdownMenu.Item>
            <DropdownMenu.Item callback={() => { action = 'Publish'; }}>Publish</DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
    <p role="status" class="min-h-5 text-sm text-foreground-muted">{message}</p>
</div>
