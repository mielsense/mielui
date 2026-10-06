<script lang="ts">
    import * as Popover from '@mielui/svelte/components/popover';
</script>

<Popover.Root hoverable delay={200} closeDelay={300} placement="top">
    <Popover.Trigger variant="outline">Hover for the build status</Popover.Trigger>
    <Popover.Content class="w-64">
        <Popover.Title>Build 2418</Popover.Title>
        <p class="text-sm text-foreground-muted">
            Passed 4 minutes ago. It opens after 200 ms and lingers for 300.
        </p>
    </Popover.Content>
</Popover.Root>
