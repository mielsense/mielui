<script lang="ts">
    import * as Popover from '@mielui/svelte/components/popover';

    const placements = ['top', 'right', 'bottom', 'left'] as const;
</script>

<div class="flex flex-wrap justify-center gap-4">
    {#each placements as placement (placement)}
        <Popover.Root {placement}>
            <Popover.Trigger variant="outline">{placement}</Popover.Trigger>
            <Popover.Content class="w-48" aria-label={`${placement} placement`}>
                <p class="m-0 text-sm text-foreground-muted">Anchored to the {placement}</p>
            </Popover.Content>
        </Popover.Root>
    {/each}
</div>
