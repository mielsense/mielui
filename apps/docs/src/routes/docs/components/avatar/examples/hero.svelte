<script lang="ts">
    import * as Avatar from '@mielui/svelte/components/avatar';

    const team = [
        { name: 'Maya Chen', initials: 'MC', role: 'Design lead' },
        { name: 'Theo Martin', initials: 'TM', role: 'Engineer' },
        { name: 'Amira Diallo', initials: 'AD', role: 'Product manager' }
    ];
</script>

<div class="flex w-full max-w-xs flex-col gap-5">
    <div class="flex items-center gap-3">
        <Avatar.Root size="lg">
            <Avatar.Image src="https://github.com/mielsense.png" alt="" />
            <Avatar.Fallback>MI</Avatar.Fallback>
        </Avatar.Root>
        <div class="flex min-w-0 flex-col">
            <span class="truncate text-sm font-medium text-foreground">Mielsense</span>
            <span class="truncate text-sm text-foreground-muted">Maintainer</span>
        </div>
    </div>
    <ul class="m-0 flex list-none flex-col gap-3 p-0">
        {#each team as member (member.name)}
            <li class="flex items-center gap-3">
                <Avatar.Root size="sm">
                    <Avatar.Fallback>{member.initials}</Avatar.Fallback>
                </Avatar.Root>
                <span class="min-w-0 flex-1 truncate text-sm text-foreground">{member.name}</span>
                <span class="shrink-0 text-sm text-foreground-muted">{member.role}</span>
            </li>
        {/each}
    </ul>
</div>
