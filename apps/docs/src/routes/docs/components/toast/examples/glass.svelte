<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { toast } from '@mielui/svelte/components/toast';

    function showDetails() {
        toast.info('Deployment details', {
            description: 'Preview build completed with no errors.'
        });
    }

    function deploy() {
        toast.success('Deployment ready', {
            surface: 'glass',
            description: 'The preview build completed successfully.',
            actions: [
                {
                    label: 'View details',
                    callback: showDetails
                }
            ]
        });
    }
</script>

<Button onclick={deploy}>Deploy</Button>
