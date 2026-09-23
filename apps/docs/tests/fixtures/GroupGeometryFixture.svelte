<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import * as Combobox from '@mielui/svelte/components/combobox';
    import * as Group from '@mielui/svelte/components/group';
    import { Input } from '@mielui/svelte/components/input';
    import * as Select from '@mielui/svelte/components/select';

    const sizes = ['sm', 'md', 'lg'] as const;
</script>

{#each sizes as size}
    <Group.Root data-testid={`input-${size}`}>
        <Input aria-label={`${size} search`} />
        <Group.Separator />
        <Button {size} variant="outline">Filter</Button>
    </Group.Root>
    <Group.Root data-testid={`adorned-${size}`}>
        <Input aria-label={`${size} website`} prefix="https://" />
        <Group.Separator />
        <Button {size} variant="outline">Copy</Button>
    </Group.Root>
    <Group.Root data-testid={`select-${size}`}>
        <Select.Root>
            <Select.Trigger {size}>Role</Select.Trigger>
        </Select.Root>
        <Group.Separator />
        <Button {size} variant="outline">Edit</Button>
    </Group.Root>
    <Group.Root data-testid={`combobox-${size}`}>
        <Combobox.Root>
            <Combobox.Trigger {size} placeholder="Find a role" />
        </Combobox.Root>
        <Group.Separator />
        <Button {size} variant="outline">Edit</Button>
    </Group.Root>
{/each}
<table class="w-full">
    <tbody>
        <tr>
            <td><Badge>Editor</Badge></td>
        </tr>
    </tbody>
</table>
