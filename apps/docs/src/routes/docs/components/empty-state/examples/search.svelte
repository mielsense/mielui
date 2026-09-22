<script lang="ts">
    import { Search01Icon } from '@hugeicons/core-free-icons';
    import * as EmptyState from '@mielui/svelte/components/empty-state';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<EmptyState.Root class="max-w-sm">
    <EmptyState.Media aria-hidden="true">
        <HugeiconsIcon icon={Search01Icon} class="size-6" />
    </EmptyState.Media>
    <EmptyState.Header>
        <EmptyState.Title>No matching files</EmptyState.Title>
        <EmptyState.Description>
            Nothing matches “invoice”. Try another file name or remove a filter.
        </EmptyState.Description>
    </EmptyState.Header>
</EmptyState.Root>
