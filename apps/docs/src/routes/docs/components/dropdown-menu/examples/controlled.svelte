<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';

    const branches = ['main', 'feat/rate-limit', 'fix/invoice-test-clock'];

    let open = $state(false);
    let loads = $state(0);
    let lastChange = $state('none yet');
</script>

<div class="flex flex-col items-center gap-3">
    <div class="flex items-center gap-2">
        <DropdownMenu.Root
            bind:open
            onOpenChange={(next) => {
                lastChange = next ? 'opened' : 'closed';
            }}
        >
            <DropdownMenu.Trigger
                variant="outline"
                onopen={() => {
                    loads += 1;
                }}
            >
                Switch branch
            </DropdownMenu.Trigger>
            <DropdownMenu.Content class="min-w-[13rem]">
                {#each branches as branch (branch)}
                    <DropdownMenu.Item>{branch}</DropdownMenu.Item>
                {/each}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
        <Button
            variant="ghost"
            onclick={() => {
                open = true;
            }}
        >
            Open it from here
        </Button>
    </div>
    <p class="text-sm text-foreground-muted">
        Trigger opened it {loads} times. Last change by a person: {lastChange}.
    </p>
</div>
