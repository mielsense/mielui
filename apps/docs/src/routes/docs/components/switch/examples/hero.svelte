<script lang="ts">
    import { Switch } from '@mielui/svelte/components/switch';

    let enabled = $state(true);
</script>

<Switch bind:checked={enabled} label="Push notifications" />
