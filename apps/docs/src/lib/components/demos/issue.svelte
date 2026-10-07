<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
    import * as Combobox from '@mielui/svelte/components/combobox';
    import * as Select from '@mielui/svelte/components/select';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as TagInput from '@mielui/svelte/components/tag-input';

    const statuses = ['Triage', 'In progress', 'In review', 'Done'];
    const people = [
        { value: 'maya', label: 'Maya Reyes' },
        { value: 'theo', label: 'Theo Martin' },
        { value: 'amira', label: 'Amira Diallo' },
        { value: 'jordan', label: 'Jordan Lee' }
    ];

    let status = $state(statuses[1]);
    let assignee = $state('maya');
    let labels = $state(['checkout', 'safari']);
    let notify = $state(true);
    let saved = $state(false);
</script>

<!--
    @component
    An issue editor that pairs a select, a combobox, a tag input, and a switch.
-->

<div
    class="flex h-full min-h-0 min-w-0 items-center justify-center overflow-y-auto bg-[var(--docs-soft)] p-5"
>
    <Card.Root class="w-full max-w-sm">
        <Card.Header>
            <Card.Title>Checkout stalls on Safari 17</Card.Title>
            <Card.Description>
                Tapping Pay leaves the spinner running after the card is approved.
            </Card.Description>
        </Card.Header>
        <Card.Content class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-3">
                <div class="flex min-w-0 flex-col gap-1.5">
                    <span id="issue-status-label" class="text-sm font-medium">Status</span>
                    <Select.Root
                        bind:value={status}
                        onValueChange={() => {
                            saved = false;
                        }}
                    >
                        <Select.Trigger class="w-full" aria-labelledby="issue-status-label">
                            <span class="truncate">{status}</span>
                        </Select.Trigger>
                        <Select.Content>
                            {#each statuses as option (option)}
                                <Select.Item value={option}>{option}</Select.Item>
                            {/each}
                        </Select.Content>
                    </Select.Root>
                </div>
                <div class="flex min-w-0 flex-col gap-1.5">
                    <span class="text-sm font-medium">Assignee</span>
                    <Combobox.Root
                        bind:value={assignee}
                        onValueChange={() => {
                            saved = false;
                        }}
                    >
                        <Combobox.Trigger placeholder="Assign someone" class="w-full" />
                        <Combobox.Content>
                            <Combobox.Results>
                                {#each people as person (person.value)}
                                    <Combobox.Item value={person.value} label={person.label} />
                                {/each}
                            </Combobox.Results>
                        </Combobox.Content>
                    </Combobox.Root>
                </div>
            </div>
            <TagInput.Root bind:tags={labels} label="Labels" max={5}>
                <TagInput.List />
                <TagInput.Input placeholder="Add a label" />
            </TagInput.Root>
            <Switch
                bind:checked={notify}
                label="Notify the team"
                description="Post an update in #checkout."
            />
        </Card.Content>
        <Card.Footer class="justify-end gap-2">
            <Button variant="ghost">Cancel</Button>
            <Button
                onclick={() => {
                    saved = true;
                }}
            >
                {saved ? 'Saved' : 'Save issue'}
            </Button>
        </Card.Footer>
    </Card.Root>
</div>
