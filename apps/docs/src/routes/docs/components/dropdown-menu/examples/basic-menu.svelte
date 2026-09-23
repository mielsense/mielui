<script lang="ts">
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';

    let order = $state('Newest first');
    function sort(value: string) {
        order = value;
    }
</script>

<div class="flex flex-col items-center gap-3">
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>Sort files</DropdownMenu.Trigger>
        <DropdownMenu.Content>
            <DropdownMenu.Item callback={() => sort('Newest first')}>
                Newest first
            </DropdownMenu.Item>
            <DropdownMenu.Item callback={() => sort('Name A to Z')}>Name A to Z</DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
    <p role="status" class="text-sm text-foreground-muted">{order}</p>
</div>
