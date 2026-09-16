<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { toast } from '@mielui/svelte/components/toast';
</script>

<Button
    onclick={() => {
    toast({
        title: 'Changes ready',
        description: 'Your theme is saved as a draft. Apply it to the workspace when you are ready.',
        persistent: true,
        actions: [
            { label: 'Discard', callback: () => {
                toast.info('Draft discarded');
            } },
            { label: 'Apply', variant: 'primary', callback: () => {
                toast.success('Theme applied');
            } }
        ]
    });
}}
>
    Show action toast
</Button>
