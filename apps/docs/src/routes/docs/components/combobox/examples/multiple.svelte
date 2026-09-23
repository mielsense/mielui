<script lang="ts">
    import * as Combobox from '@mielui/svelte/components/combobox';

    let selected = $state(['design']);
    const teams = [
        { value: 'design', label: 'Design' },
        { value: 'engineering', label: 'Engineering' },
        { value: 'support', label: 'Support' },
        { value: 'operations', label: 'Operations' }
    ];
</script>

<div class="w-full max-w-xs space-y-3">
    <Combobox.Root type="multiple" bind:value={selected}>
        <Combobox.Trigger
            name="teams"
            placeholder="Choose teams"
            searchPlacement="menu"
            class="w-full"
        />
        <Combobox.Content>
            <Combobox.Results>
                {#each teams as team (team.value)}
                    <Combobox.Item value={team.value} label={team.label} />
                {/each}
                <Combobox.Item value="archived" label="Archived team" disabled />
            </Combobox.Results>
        </Combobox.Content>
    </Combobox.Root>
    <p class="text-sm text-foreground-muted" aria-live="polite">
        {selected.length}
        {selected.length === 1 ? 'team' : 'teams'} selected
    </p>
</div>
