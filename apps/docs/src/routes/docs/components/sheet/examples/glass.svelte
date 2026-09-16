<script lang="ts">
    import CircleAlert from '@hugeicons/core-free-icons/AlertCircleIcon';
    import Circle from '@hugeicons/core-free-icons/CircleIcon';
    import SquarePen from '@hugeicons/core-free-icons/Edit01Icon';
    import Minus from '@hugeicons/core-free-icons/MinusSignIcon';
    import SignalHigh from '@hugeicons/core-free-icons/SignalHighIcon';
    import SignalLow from '@hugeicons/core-free-icons/SignalLow01Icon';
    import SignalMedium from '@hugeicons/core-free-icons/SignalMedium01Icon';
    import * as Avatar from '@mielui/svelte/components/avatar';
    import { Button } from '@mielui/svelte/components/button';
    import { Input } from '@mielui/svelte/components/input';
    import Kbd from '@mielui/svelte/components/kbd';
    import { Label } from '@mielui/svelte/components/label';
    import * as Select from '@mielui/svelte/components/select';
    import * as Sheet from '@mielui/svelte/components/sheet';
    import { Textarea } from '@mielui/svelte/components/textarea';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let open = $state(false);
    let issueTitle = $state('');
    let issueDescription = $state('');
    let status = $state('');
    let priority = $state('');
    let assignee = $state('');

    const statuses = [
        { value: 'todo', label: 'Todo', icon: Circle },
        { value: 'in-progress', label: 'In progress', icon: Circle },
        { value: 'done', label: 'Done', icon: Circle }
    ];

    const priorities = [
        { value: 'none', label: 'No priority', icon: Minus },
        { value: 'urgent', label: 'Urgent', icon: CircleAlert },
        { value: 'high', label: 'High', icon: SignalHigh },
        { value: 'medium', label: 'Medium', icon: SignalMedium },
        { value: 'low', label: 'Low', icon: SignalLow }
    ];

    const assignees = [
        { value: 'an', label: 'mielsense', initials: 'AN' },
        { value: 'sk', label: 'Sam K.', initials: 'SK' },
        { value: 'unassigned', label: 'Unassigned', initials: '?' }
    ];

    const statusMeta = $derived(statuses.find((s) => s.value === status));
    const priorityMeta = $derived(priorities.find((p) => p.value === priority));
    const assigneeMeta = $derived(assignees.find((a) => a.value === assignee));
    const canCreate = $derived(issueTitle.trim().length > 0);

    function reset() {
        issueTitle = '';
        issueDescription = '';
        status = '';
        priority = '';
        assignee = '';
    }

    function createIssue() {
        if (!canCreate) {
            return;
        }
        reset();
        open = false;
    }
</script>

<div class="flex items-center justify-center">
    <Sheet.Root bind:open>
        <Sheet.Trigger>
            <HugeiconsIcon icon={SquarePen} size={16} />
            New issue
        </Sheet.Trigger>
        <Sheet.Content surface="glass" side="right">
            <Sheet.Header>
                <div class="flex items-center gap-2.5">
                    <HugeiconsIcon icon={SquarePen} size={18} class="text-foreground-muted" />
                    <Sheet.Title>New issue</Sheet.Title>
                </div>
                <Sheet.Description>Create a new issue in Engineering.</Sheet.Description>
            </Sheet.Header>

            <div class="flex flex-col gap-4">
                <Input
                    bind:value={issueTitle}
                    label="Title"
                    placeholder="Issue title"
                    description="A short, specific summary of the work."
                />

                <Textarea
                    bind:value={issueDescription}
                    label="Description"
                    placeholder="Add description…"
                    class="min-h-[120px]"
                />

                <div class="h-px w-full bg-border" role="separator"></div>

                <div class="flex flex-col gap-3">
                    <div class="flex flex-col gap-1.5">
                        <Label>Status</Label>
                        <Select.Root bind:value={status}>
                            <Select.Trigger class="w-full" variant="outline" size="md">
                                <span class="flex min-w-0 items-center gap-2">
                                    {#if statusMeta}
                                        <HugeiconsIcon
                                            icon={statusMeta.icon}
                                            size={14}
                                            class="shrink-0 text-foreground-muted"
                                        />
                                    {/if}
                                    <Select.Value placeholder="Status" />
                                </span>
                            </Select.Trigger>
                            <Select.Content>
                                {#each statuses as item (item.value)}
                                    <Select.Item value={item.value} label={item.label}>
                                        <span class="flex items-center gap-2">
                                            <HugeiconsIcon
                                                icon={item.icon}
                                                size={14}
                                                class="text-foreground-muted"
                                            />
                                            {item.label}
                                        </span>
                                    </Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <Label>Priority</Label>
                        <Select.Root bind:value={priority}>
                            <Select.Trigger class="w-full" variant="outline" size="md">
                                <span class="flex min-w-0 items-center gap-2">
                                    {#if priorityMeta}
                                        <HugeiconsIcon
                                            icon={priorityMeta.icon}
                                            size={14}
                                            class="shrink-0 text-foreground-muted"
                                        />
                                    {/if}
                                    <Select.Value placeholder="Priority" />
                                </span>
                            </Select.Trigger>
                            <Select.Content>
                                {#each priorities as item (item.value)}
                                    <Select.Item value={item.value} label={item.label}>
                                        <span class="flex items-center gap-2">
                                            <HugeiconsIcon
                                                icon={item.icon}
                                                size={14}
                                                class="text-foreground-muted"
                                            />
                                            {item.label}
                                        </span>
                                    </Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <Label>Assignee</Label>
                        <Select.Root bind:value={assignee}>
                            <Select.Trigger class="w-full" variant="outline" size="md">
                                <span class="flex min-w-0 items-center gap-2">
                                    {#if assigneeMeta}
                                        <Avatar.Root size="sm" class="size-5 shrink-0 text-[10px]">
                                            <Avatar.Fallback>
                                                {assigneeMeta.initials}
                                            </Avatar.Fallback>
                                        </Avatar.Root>
                                    {/if}
                                    <Select.Value placeholder="Assignee" />
                                </span>
                            </Select.Trigger>
                            <Select.Content>
                                {#each assignees as person (person.value)}
                                    <Select.Item value={person.value} label={person.label}>
                                        <span class="flex items-center gap-2">
                                            <Avatar.Root size="sm" class="size-5 text-[10px]">
                                                <Avatar.Fallback>{person.initials}</Avatar.Fallback>
                                            </Avatar.Root>
                                            {person.label}
                                        </span>
                                    </Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                    </div>
                </div>
            </div>

            <Sheet.Footer>
                <Sheet.Close onclick={reset}>
                    Cancel
                    <Kbd shortcut="esc" />
                </Sheet.Close>
                <Button onclick={() => createIssue()}>
                    Create issue
                    <Kbd shortcut="enter" />
                </Button>
            </Sheet.Footer>
        </Sheet.Content>
    </Sheet.Root>
</div>
