<script lang="ts">
    import * as RadioGroup from '@mielui/svelte/components/radio-group';

    let log = $state('No change yet');
</script>

<div class="flex max-w-sm flex-col gap-3">
    <span id="plan-label" class="text-sm font-medium">Plan</span>
    <RadioGroup.Root
        name="plan"
        aria-labelledby="plan-label"
        onValueChange={(value) => {
            log = `Changed to ${value}`;
        }}
    >
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item value="team" label="Team" />
        <RadioGroup.Item value="business" label="Business" />
    </RadioGroup.Root>
    <p role="status" class="text-sm text-foreground-muted">{log}</p>
</div>
