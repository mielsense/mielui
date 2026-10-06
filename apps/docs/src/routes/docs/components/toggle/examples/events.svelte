<script lang="ts">
    import { Toggle } from '@mielui/svelte/components/toggle';

    let log = $state('Notifications are on');
</script>

<div class="flex items-center gap-3">
    <Toggle
        onPressedChange={(pressed) => {
            log = pressed ? 'Notifications are muted' : 'Notifications are on';
        }}
    >
        Mute
    </Toggle>
    <span role="status" class="text-sm text-foreground-muted">{log}</span>
</div>
