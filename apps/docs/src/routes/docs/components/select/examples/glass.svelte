<script lang="ts">
    import * as Select from '@mielui/svelte/components/select';

    const priorities = ['No priority', 'Urgent', 'High', 'Medium', 'Low'];

    let priority = $state('Medium');
</script>

<div class="flex flex-col gap-2">
    <span id="glass-priority-label" class="text-sm font-medium">Priority</span>
    <Select.Root bind:value={priority}>
        <Select.Trigger aria-labelledby="glass-priority-label" class="min-w-56" />
        <Select.Content surface="glass">
            {#each priorities as option (option)}
                <Select.Item value={option}>{option}</Select.Item>
            {/each}
        </Select.Content>
    </Select.Root>
</div>
