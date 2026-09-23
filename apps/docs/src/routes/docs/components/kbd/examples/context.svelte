<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import Kbd from '@mielui/svelte/components/kbd';

    let saved = $state(false);
    function save() {
        saved = true;
    }
</script>

<div class="flex flex-col items-center gap-3">
    <Button variant="secondary" onclick={save}>
        Save draft
        <Kbd shortcut="alt+S" ontrigger={save} />
    </Button>
    <p role="status" class="text-sm text-foreground-muted">
        {saved ? 'Draft saved in this preview.' : 'Click Save draft or press Alt+S.'}
    </p>
</div>
