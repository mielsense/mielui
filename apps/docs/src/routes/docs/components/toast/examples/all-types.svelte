<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { toast } from '@mielui/svelte/components/toast';

    function showDefault() {
        toast({
            title: 'Heads up',
            description: 'A neutral toast.'
        });
    }

    function showSuccess() {
        toast.success('Profile updated', {
            description: 'Your changes have been saved.'
        });
    }

    function showError() {
        toast.error('Request failed', {
            description: 'Could not connect to the server.'
        });
    }

    function showWarning() {
        toast.warning('Storage almost full', {
            description: 'You have 200 MB remaining.'
        });
    }

    function showInfo() {
        toast.info('New version', {
            description: 'Refresh to update.'
        });
    }
</script>

<div class="flex flex-wrap gap-2">
    <Button onclick={showDefault}>Default</Button>
    <Button onclick={showSuccess}>Success</Button>
    <Button onclick={showError}>Error</Button>
    <Button onclick={showWarning}>Warning</Button>
    <Button onclick={showInfo}>Info</Button>
</div>
