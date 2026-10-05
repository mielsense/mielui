<script lang="ts">
    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';

    const sizes = ['sm', 'md', 'lg'] as const;
</script>

<div class="flex flex-col items-center gap-4">
    {#each sizes as size (size)}
        <ToggleGroup.Root type="single" value="week" {size} aria-label={`Range, ${size}`}>
            <ToggleGroup.Item value="day">Day</ToggleGroup.Item>
            <ToggleGroup.Item value="week">Week</ToggleGroup.Item>
            <ToggleGroup.Item value="month">Month</ToggleGroup.Item>
        </ToggleGroup.Root>
    {/each}
</div>
