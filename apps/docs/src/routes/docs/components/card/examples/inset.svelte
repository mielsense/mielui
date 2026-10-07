<script lang="ts">
    import * as Avatar from '@mielui/svelte/components/avatar';
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';

    type Member = {
        name: string;
        initials: string;
        role: string;
    };

    const waiting: Member[] = [
        { name: 'Amira Diallo', initials: 'AD', role: 'Viewer' },
        { name: 'Jonas Weber', initials: 'JW', role: 'Editor' }
    ];

    let members = $state<Member[]>([
        { name: 'Ines Moreau', initials: 'IM', role: 'Owner' },
        { name: 'Theo Martin', initials: 'TM', role: 'Editor' },
        { name: 'Maya Chen', initials: 'MC', role: 'Editor' }
    ]);

    const next = $derived(
        waiting.find((person) => !members.some((member) => member.name === person.name))
    );

    function invite() {
        if (next) {
            members.push(next);
        }
    }
</script>

<Card.Root variant="inset" class="w-full max-w-sm">
    <Card.Header>
        <Card.Title>Project members</Card.Title>
        <Card.Description>People who can open the checkout redesign.</Card.Description>
    </Card.Header>
    <Card.Content>
        <ul class="m-0 flex list-none flex-col gap-3 p-0">
            {#each members as member (member.name)}
                <li class="flex items-center gap-3">
                    <Avatar.Root size="sm">
                        <Avatar.Fallback>{member.initials}</Avatar.Fallback>
                    </Avatar.Root>
                    <span class="min-w-0 flex-1 truncate text-sm">{member.name}</span>
                    <span class="shrink-0 text-sm text-foreground-muted">{member.role}</span>
                </li>
            {/each}
        </ul>
    </Card.Content>
    <Card.Footer>
        <span role="status" class="me-auto ps-2 text-sm text-foreground-muted">
            {members.length}
            members
        </span>
        <Button variant="outline" disabled={!next} onclick={invite}>
            {next ? `Invite ${next.name.split(' ')[0]}` : 'Everyone is in'}
        </Button>
    </Card.Footer>
</Card.Root>
