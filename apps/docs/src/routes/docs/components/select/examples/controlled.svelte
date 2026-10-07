<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Select from '@mielui/svelte/components/select';

    const regions = ['Europe', 'North America', 'Asia Pacific'];

    let open = $state(false);
    let region = $state('Europe');
    let lastChange = $state('none yet');
</script>

<div class="flex flex-col items-center gap-3">
    <div class="flex items-end gap-2">
        <div class="grid gap-1.5">
            <span id="region-label" class="text-sm font-medium">Region</span>
            <Select.Root
                bind:value={region}
                bind:open
                onOpenChange={(next) => {
                    lastChange = next ? 'opened' : 'closed';
                }}
            >
                <Select.Trigger aria-labelledby="region-label" class="w-48"
                    >{region}</Select.Trigger
                >
                <Select.Content>
                    {#each regions as option (option)}
                        <Select.Item value={option}>{option}</Select.Item>
                    {/each}
                </Select.Content>
            </Select.Root>
        </div>
        <Button
            variant="ghost"
            onclick={() => {
                open = true;
            }}
        >
            Open the list
        </Button>
    </div>
    <p class="text-sm text-foreground-muted">Last change by a person: {lastChange}</p>
</div>
