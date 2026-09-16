<script lang="ts">
    import ArrowLeft01Icon from '@hugeicons/core-free-icons/ArrowLeft01Icon';
    import ArrowRight01Icon from '@hugeicons/core-free-icons/ArrowRight01Icon';
    import { Button } from '@mielui/svelte/components/button';
    import * as Group from '@mielui/svelte/components/group';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let page = $state(1);
</script>

<Group.Root aria-label="Pagination">
    <Group.Root aria-label="Pages">
        {#each [1, 2, 3, 4, 5] as number (number)}
            {#if number > 1}
                <Group.Separator />
            {/if}
            <Button
                variant="outline"
                size="sm"
                class="w-8 px-0"
                aria-current={page === number ? 'page' : undefined}
                onclick={() => { page = number; }}
            >
                {number}
            </Button>
        {/each}
    </Group.Root>
    <Group.Root aria-label="Navigation">
        <Button
            variant="outline"
            size="sm"
            class="w-8 px-0"
            aria-label="Previous page"
            disabled={page === 1}
            onclick={() => { page -= 1; }}
        >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
        </Button>
        <Group.Separator />
        <Button
            variant="outline"
            size="sm"
            class="w-8 px-0"
            aria-label="Next page"
            disabled={page === 5}
            onclick={() => { page += 1; }}
        >
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
        </Button>
    </Group.Root>
</Group.Root>
