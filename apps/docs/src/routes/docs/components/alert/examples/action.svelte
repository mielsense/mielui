<script lang="ts">
    import * as Alert from '@mielui/svelte/components/alert';
    import { Button } from '@mielui/svelte/components/button';

    let checked = $state(false);
</script>

<div class="w-full max-w-xl">
    <Alert.Root variant="info" announcement="polite">
        <Alert.Title>{checked ? 'Snippet found.' : 'No events yet.'}</Alert.Title>
        <Alert.Description>
            {checked
                ? 'The first pageview will appear here within a few seconds.'
                : 'If the snippet is live, browse your site and the first pageview will appear here.'}
        </Alert.Description>
        <Button
            variant="secondary"
            size="sm"
            disabled={checked}
            onclick={() => {
                checked = true;
            }}
        >
            {checked ? 'Install checked' : 'Check the install'}
        </Button>
    </Alert.Root>
</div>
