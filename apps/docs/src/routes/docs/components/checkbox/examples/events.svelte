<script lang="ts">
    import { Checkbox } from '@mielui/svelte/components/checkbox';

    let log = $state('Not accepted yet');
</script>

<div class="flex flex-col gap-3">
    <Checkbox
        label="I accept the terms"
        variant="primary"
        onCheckedChange={(checked) => {
            log = checked ? 'Accepted' : 'Not accepted yet';
        }}
    />
    <p role="status" class="text-sm text-foreground-muted">{log}</p>
</div>
