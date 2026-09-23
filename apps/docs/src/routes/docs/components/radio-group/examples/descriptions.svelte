<script lang="ts">
    import * as RadioGroup from '@mielui/svelte/components/radio-group';

    let frequency = $state<string | undefined>('weekly');
    const summary = $derived(
        frequency === 'daily'
            ? 'A digest arrives each morning.'
            : frequency === 'weekly'
              ? 'A digest arrives every Monday.'
              : 'Only security notices will be sent.'
    );
</script>

<fieldset class="flex max-w-sm flex-col gap-4">
    <legend class="mb-3 text-sm font-medium">Email digest frequency</legend>
    <RadioGroup.Root bind:value={frequency} name="digest-frequency">
        <RadioGroup.Item
            value="daily"
            label="Daily"
            description="Activity from the previous day."
        />
        <RadioGroup.Item
            value="weekly"
            label="Weekly"
            description="One summary of the week's activity."
        />
        <RadioGroup.Item value="off" label="Off" description="Keep required account notices." />
    </RadioGroup.Root>
    <p role="status" class="text-sm text-foreground-muted">{summary}</p>
</fieldset>
