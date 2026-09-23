<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { toast } from '@mielui/svelte/components/toast';
</script>

<div class="flex items-center justify-center">
    <Button
        onclick={() =>
            toast.success('Deployment ready', {
                description: 'The preview build completed successfully.',
                actions: [
                    {
                        label: 'View details',
                        callback: () => {
                            toast.info('Deployment details', { description: 'Preview build completed with no errors.' });
                        }
                    }
                ]
            })}
    >
        Deploy
    </Button>
</div>
