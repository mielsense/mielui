<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { toast } from '@mielui/svelte/components/toast';
</script>

<div class="flex items-center justify-center">
    <Button
        onclick={() =>
            toast.success('Deployment ready', {
                description: 'mielui.vercel.app is now live.',
                actions: [
                    {
                        label: 'Visit',
                        callback: () => {
                            window.open('https://vercel.com', '_blank');
                        }
                    }
                ]
            })}
    >
        Deploy
    </Button>
</div>
