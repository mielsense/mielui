<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import Kbd from '@mielui/svelte/components/kbd';

    let message = $state('Try a shortcut or choose an action.');

    function cancel() {
        message = 'Changes discarded in this preview.';
    }
    function save() {
        message = 'Draft saved in this preview.';
    }
    function ontrigger() {
        message = 'Pressed K. Shortcut activated in this preview.';
    }
</script>

<div class="flex flex-col items-center gap-4">
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

    <p role="status" class="text-sm text-foreground-muted">{message}</p>
</div>
