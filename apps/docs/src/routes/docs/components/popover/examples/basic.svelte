<script lang="ts">
    import * as Popover from '@mielui/svelte/components/popover';
</script>

<Popover.Root>
    <Popover.Trigger>Open popover</Popover.Trigger>
    <Popover.Content class="w-64" aria-label="Details">
        <p class="m-0 text-sm text-foreground-muted">Popover content goes here.</p>
    </Popover.Content>
</Popover.Root>
