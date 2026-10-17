<script lang="ts">
    import * as Select from '@mielui/svelte/components/select';

    const roles = ['Viewer', 'Editor', 'Billing administrator'];

    let role = $state('Viewer');
</script>

<div class="flex flex-col gap-2">
    <span id="dynamic-width-label" class="text-sm font-medium">Role</span>
    <Select.Root bind:value={role}>
        <Select.Trigger aria-labelledby="dynamic-width-label" class="w-40" />
        <Select.Content dynamic>
            {#each roles as option (option)}
                <Select.Item value={option}>{option}</Select.Item>
            {/each}
        </Select.Content>
    </Select.Root>
</div>
