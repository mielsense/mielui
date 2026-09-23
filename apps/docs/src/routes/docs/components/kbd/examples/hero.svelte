<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import Kbd from '@mielui/svelte/components/kbd';
    import { toast } from '@mielui/svelte/components/toast';

    function cancel() {
        toast({ title: 'Changes discarded', duration: 2000 });
    }
    function save() {
        toast({ title: 'Draft saved', duration: 2000 });
    }
    function ontrigger() {
        toast({
            title: 'Shortcut activated',
            description: 'Pressed K',
            duration: 2000,
            type: 'success'
        });
    }
</script>

<div class="flex flex-wrap items-center justify-center gap-3">
    <Button variant="ghost" onclick={cancel}>
        Cancel
        <Kbd shortcut="esc" />
    </Button>
    <Button onclick={save}>
        Save
        <Kbd shortcut="enter" />
    </Button>
    <Kbd shortcut="K" {ontrigger} />
</div>
