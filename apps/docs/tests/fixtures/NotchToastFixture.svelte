<script lang="ts">
    import { Toaster, toast } from '@mielui/svelte/components/toast';

    let { side = 'top' }: { side?: 'top' | 'bottom' | 'left' | 'right' } = $props();
    let resolveRequest: (() => void) | undefined;

    function begin() {
        const request = new Promise<void>((resolve) => {
            resolveRequest = resolve;
        });
        toast.promise(request, {
            loading: 'Exporting workspace',
            success: 'Export ready',
            successDescription: 'Your workspace is ready to download.',
            error: 'Export failed'
        });
    }
</script>

<Toaster variant="notch" {side} />
<div style="padding-top: 240px">
    <button type="button" onclick={begin}>Begin export</button>
    <button type="button" onclick={() => resolveRequest?.()}>Finish export</button>
    <button
        type="button"
        onclick={() => toast.info('Another activity', { persistent: true, actions: [{ label: 'Done', callback: () => {} }] })}
    >
        Add activity
    </button>
</div>
