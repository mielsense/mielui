<script lang="ts">
    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';

    let formatting = $state(['bold', 'italic']);
</script>

<ToggleGroup.Root type="multiple" bind:value={formatting} aria-label="Text formatting">
    <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
    <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
    <ToggleGroup.Item value="underline">Underline</ToggleGroup.Item>
</ToggleGroup.Root>
