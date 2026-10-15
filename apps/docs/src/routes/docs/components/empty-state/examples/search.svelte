<script lang="ts">
    import { Search01Icon } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as EmptyState from '@mielui/svelte/components/empty-state';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let query = $state('invoice');

    const title = $derived(query ? 'No matching files' : 'Search cleared');
    const description = $derived(
        query
            ? `Nothing matches "${query}". Try another file name or clear your search.`
            : 'No search filter is active. Your files will appear here when available.'
    );

    function clearSearch() {
        query = '';
    }
</script>

<EmptyState.Root class="max-w-sm">
    <EmptyState.Media aria-hidden="true">
        <HugeiconsIcon icon={Search01Icon} class="size-6" />
    </EmptyState.Media>
    <EmptyState.Header>
        <EmptyState.Title>{title}</EmptyState.Title>
        <EmptyState.Description>{description}</EmptyState.Description>
    </EmptyState.Header>
    {#if query}
        <EmptyState.Actions>
            <Button variant="secondary" onclick={clearSearch}>Clear search</Button>
        </EmptyState.Actions>
    {/if}
</EmptyState.Root>
