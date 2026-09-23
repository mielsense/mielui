<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Select from '@mielui/svelte/components/select';

    const options = [
        { value: 'design', label: 'Design' },
        { value: 'engineering', label: 'Engineering' },
        { value: 'support', label: 'Support' },
        { value: 'finance', label: 'Finance', disabled: true }
    ];
    let teams = $state<string[]>(['design']);
    let submitted = $state('');

    function clear() {
        teams = [];
        submitted = '';
    }

    function submit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
        event.preventDefault();
        const values = new FormData(event.currentTarget).getAll('teams').filter((value) => {
            return typeof value === 'string' && value.length > 0;
        });
        submitted = values.length ? `Saved: ${values.join(', ')}` : 'No teams selected.';
    }
</script>

<form class="flex w-full max-w-sm flex-col gap-4" onsubmit={submit}>
    <Select.Root type="multiple" bind:value={teams} name="teams">
        <Select.Trigger aria-label="Teams" class="w-full">
            <Select.Value placeholder="Select teams" />
        </Select.Trigger>
        <Select.Content>
            {#each options as option (option.value)}
                <Select.Item value={option.value} label={option.label} disabled={option.disabled}>
                    {option.label}
                </Select.Item>
            {/each}
        </Select.Content>
    </Select.Root>
    <div class="flex items-center gap-2">
        <Button type="submit">Save teams</Button>
        <Button variant="outline" onclick={clear}>Clear</Button>
    </div>
    <p role="status" class="min-h-5 text-sm text-foreground-muted">
        {submitted || `${teams.length} selected`}
    </p>
</form>
