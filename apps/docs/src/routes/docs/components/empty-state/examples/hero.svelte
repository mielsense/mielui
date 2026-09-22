<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as EmptyState from '@mielui/svelte/components/empty-state';
</script>

<EmptyState.Root class="max-w-sm">
    <EmptyState.Header>
        <EmptyState.Title>No components yet</EmptyState.Title>
        <EmptyState.Description>
            Add your first component to start building your interface.
        </EmptyState.Description>
    </EmptyState.Header>
    <EmptyState.Actions>
        <Button href="/docs/installation">Add a component</Button>
    </EmptyState.Actions>
</EmptyState.Root>
