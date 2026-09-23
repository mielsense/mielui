<script lang="ts">
    import * as Alert from '@mielui/svelte/components/alert';

    const messages = [
        {
            tone: 'info',
            title: 'Maintenance scheduled',
            description: 'Reports will be unavailable Sunday from 02:00 to 03:00 UTC.'
        },
        {
            tone: 'success',
            title: 'Import complete',
            description: 'All 128 contacts are ready to use.'
        },
        {
            tone: 'warning',
            title: 'Storage almost full',
            description: 'You have used 9.2 GB of your 10 GB allowance.'
        },
        {
            tone: 'error',
            title: 'Connection lost',
            description: 'Your draft is saved locally. Reconnect before publishing.'
        }
    ] as const;
</script>

<div class="grid w-full max-w-xl gap-3">
    {#each messages as message (message.tone)}
        <Alert.Root variant={message.tone}>
            <Alert.Title>{message.title}</Alert.Title>
            <Alert.Description>{message.description}</Alert.Description>
        </Alert.Root>
    {/each}
</div>
