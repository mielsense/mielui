<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import Kbd from '@mielui/svelte/components/kbd';
    import { toast } from '@mielui/svelte/components/toast';

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
    <Button variant="ghost">
        Cancel
        <Kbd shortcut="esc" />
    </Button>
    <Button>
        Save
        <Kbd shortcut="enter" />
    </Button>
    <Kbd shortcut="K" {ontrigger} />
</div>
