<script lang="ts">
    import * as Popover from '@mielui/svelte/components/popover';
</script>

<Popover.Root>
    <Popover.Trigger variant="outline">Release notes</Popover.Trigger>
    <Popover.Content surface="glass" class="w-64" surfaceClass="flex flex-col gap-1">
        <Popover.Title>Version 0.4</Popover.Title>
        <p class="m-0 text-sm text-foreground-muted">Glass panels blur what sits behind them.</p>
    </Popover.Content>
</Popover.Root>
