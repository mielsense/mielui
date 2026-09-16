<script lang="ts">
    import { ArrowUpDownIcon as SortIcon } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import * as Table from '@mielui/svelte/components/table';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    const projects = ['Website', 'Dashboard', 'Mobile app'];
    let ascending = $state(true);
    let selected = $state<string[]>([]);
    let empty = $state(false);
    const rows = $derived(
        empty
            ? []
            : [...projects].sort((left, right) =>
                  ascending ? left.localeCompare(right) : right.localeCompare(left)
              )
    );
    function selectAll(checked: boolean) {
        selected = checked ? rows : [];
    }

    function toggleSort() {
        ascending = !ascending;
    }

    function toggleEmpty() {
        empty = !empty;
        selected = [];
    }

    function select(name: string, checked: boolean) {
        selected = checked
            ? [...new Set([...selected, name])]
            : selected.filter((value) => value !== name);
    }
</script>

<div class="flex w-full max-w-xl flex-col gap-3">
    <Table.ScrollArea tabindex={0} aria-label="Projects">
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.Head class="w-12">
                        <Checkbox
                            aria-label="Select all projects"
                            checked={rows.length > 0 && rows.every((row) => selected.includes(row))}
                            onCheckedChange={selectAll}
                        />
                    </Table.Head>
                    <Table.Head aria-sort={ascending ? 'ascending' : 'descending'}>
                        <Button variant="ghost" size="sm" class="-ms-2" onclick={toggleSort}>
                            Project<HugeiconsIcon icon={SortIcon} size={14} />
                        </Button>
                    </Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each rows as name (name)}
                    <Table.Row data-state={selected.includes(name) ? 'selected' : undefined}>
                        <Table.Cell>
                            <Checkbox
                                aria-label={`Select ${name}`}
                                checked={selected.includes(name)}
                                onCheckedChange={(checked) => select(name, checked)}
                            />
                        </Table.Cell>
                        <Table.Cell>{name}</Table.Cell>
                    </Table.Row>
                {:else}
                    <Table.Row>
                        <Table.Cell colspan={2} class="h-24 text-center text-foreground-muted">
                            No projects found.
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </Table.ScrollArea>
    <div class="flex items-center justify-between gap-3">
        <p role="status" class="text-sm text-foreground-muted">{selected.length} selected</p>
        <Button variant="outline" size="sm" onclick={toggleEmpty}>
            {empty ? 'Restore rows' : 'Show empty state'}
        </Button>
    </div>
</div>
