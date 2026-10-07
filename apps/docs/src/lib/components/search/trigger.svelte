<script lang="ts">
    import { Search01Icon as SearchIcon } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    import { getSearch } from './context';

    const search = getSearch();

    function openSearch() {
        search.open = true;
    }
</script>

<Button variant="ghost" size="icon" aria-label="Search documentation" onclick={openSearch}>
    <HugeiconsIcon icon={SearchIcon} size={16} />
</Button>
