<script lang="ts">
    import * as NativeSelect from '@mielui/svelte/components/native-select';

    let timezone = $state('Europe/Paris');
</script>

<NativeSelect.Root name="timezone" bind:value={timezone} aria-label="Time zone">
    <NativeSelect.Option value="Europe/Paris">Paris</NativeSelect.Option>
    <NativeSelect.Option value="Europe/London">London</NativeSelect.Option>
</NativeSelect.Root>
