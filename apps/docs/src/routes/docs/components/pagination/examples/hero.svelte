<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Pagination } from '@mielui/svelte/components/pagination';

    const pageSize = 5;
    const items = Array.from({ length: 48 }, (_, index) => {
        return {
            number: `INV-${1001 + index}`,
            amount: `$${((index * 37) % 90) * 10 + 120}.00`
        };
    });
    const totalPages = Math.ceil(items.length / pageSize);

    let page = $state(1);

    const pageItems = $derived(items.slice((page - 1) * pageSize, page * pageSize));
</script>

<div class="flex w-full max-w-sm flex-col gap-4">
    <ul class="m-0 flex list-none flex-col divide-y divide-border p-0">
        {#each pageItems as item (item.number)}
            <li class="flex items-center justify-between py-2 text-sm text-foreground">
                <span>{item.number}</span>
                <span class="text-foreground-muted tabular-nums">{item.amount}</span>
            </li>
        {/each}
    </ul>
    <div class="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p class="m-0 text-xs text-foreground-muted tabular-nums">
            {'Page '}
            <span use:numberShuffle={{ value: page }}>{page}</span>
            {' of '}
            <span use:numberShuffle={{ value: totalPages }}>{totalPages}</span>
        </p>
        <Pagination bind:page total={totalPages} />
    </div>
</div>
