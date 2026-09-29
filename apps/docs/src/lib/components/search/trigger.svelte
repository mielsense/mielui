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
    class="max-lg:w-[var(--size-icon-md)] max-lg:px-0 lg:ps-3 lg:pe-1.5 lg:text-foreground-muted"
    aria-label="Search documentation"
    onclick={openSearch}
>
    <HugeiconsIcon icon={SearchIcon} size={16} />
    <span class="hidden lg:inline">Search</span>
    <span class="hidden lg:ms-3 lg:inline-flex"><Kbd shortcut="cmd+K" /></span>
</Button>
