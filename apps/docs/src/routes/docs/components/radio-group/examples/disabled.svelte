<script lang="ts">
    import * as RadioGroup from '@mielui/svelte/components/radio-group';
</script>

<RadioGroup.Root disabled name="option" aria-label="Unavailable options">
    <RadioGroup.Item value="a" label="Option A" />
    <RadioGroup.Item value="b" label="Option B" />
</RadioGroup.Root>
