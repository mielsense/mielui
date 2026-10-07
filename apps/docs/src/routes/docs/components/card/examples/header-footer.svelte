<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';

    type Answer = 'pending' | 'accepted' | 'declined';

    let answer = $state<Answer>('pending');
</script>

<Card.Root class="w-full max-w-sm">
    <Card.Header>
        {#if answer === 'accepted'}
            <Card.Title>You joined Northwind</Card.Title>
            <Card.Description>You can now edit every project in the workspace.</Card.Description>
        {:else if answer === 'declined'}
            <Card.Title>Invitation declined</Card.Title>
            <Card.Description
                >Ines will not be told. You can still change your mind.</Card.Description
            >
        {:else}
            <Card.Title>Join Northwind?</Card.Title>
            <Card.Description>Ines Moreau invited you as an editor.</Card.Description>
        {/if}
    </Card.Header>
    <Card.Footer>
        {#if answer === 'pending'}
            <Button
                variant="outline"
                onclick={() => {
                    answer = 'declined';
                }}
            >
                Decline
            </Button>
            <Button
                onclick={() => {
                    answer = 'accepted';
                }}
            >
                Accept
            </Button>
        {:else}
            <Button
                variant="outline"
                onclick={() => {
                    answer = 'pending';
                }}
            >
                Undo
            </Button>
        {/if}
    </Card.Footer>
</Card.Root>
