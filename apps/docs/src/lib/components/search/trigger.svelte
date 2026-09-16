<script lang="ts">
    import { Search01Icon as SearchIcon } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import Kbd from '@mielui/svelte/components/kbd';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    import { getSearch } from './context';

    const search = getSearch();

    function openSearch() {
        search.open = true;
    }
</script>

<Button
    variant="outline"
    class="h-9 gap-2 px-2.5"
    aria-label="Search documentation"
    onclick={openSearch}
>
    <HugeiconsIcon icon={SearchIcon} size={16} />
    <span class="hidden lg:inline">Search</span>
    <span class="hidden lg:inline"><Kbd shortcut="cmd+K" /></span>
</Button>
