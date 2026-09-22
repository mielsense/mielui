<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { Toaster, toast } from '@mielui/svelte/components/toast';

    let count = 0;
    function notify() {
        count += 1;
        toast.success(`Export ${count} ready`, {
            description: 'Your workspace export is ready to download.',
            duration: 12000
        });
    }
    function activity() {
        toast.loading('Syncing workspace', {
            description: 'This activity stays until you dismiss it.'
        });
    }
</script>

<Toaster variant="notch" side="top" />
<div class="flex flex-wrap justify-center gap-2">
    <Button variant="secondary" onclick={notify}>Add notification</Button>
    <Button variant="secondary" onclick={activity}>Add ongoing activity</Button>
</div>
