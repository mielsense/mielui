<script lang="ts">
    import * as RadioGroup from '@mielui/svelte/components/radio-group';
</script>

<RadioGroup.Root disabled value="monthly" name="billing" aria-label="Billing period">
    <RadioGroup.Item value="monthly" label="Monthly" />
    <RadioGroup.Item value="yearly" label="Yearly" />
</RadioGroup.Root>
