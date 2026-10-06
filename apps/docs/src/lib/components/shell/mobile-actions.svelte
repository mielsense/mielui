<script lang="ts">
    import { Moon02Icon as Moon, Sun03Icon as Sun } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { mode, toggleMode } from 'mode-watcher';
    import SearchButton from '$lib/components/search/trigger.svelte';

    const themeLabel = $derived(
        mode.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
</script>

<div class="flex items-center gap-1 lg:hidden">
    <SearchButton />
    <Button variant="ghost" size="icon" aria-label={themeLabel} onclick={toggleMode}>
        <HugeiconsIcon icon={mode.current === 'dark' ? Moon : Sun} size={16} />
    </Button>
</div>
