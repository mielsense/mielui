<script lang="ts">
    import { Label } from '@mielui/svelte/components/label';
    import * as NativeSelect from '@mielui/svelte/components/native-select';

    let timezone = $state('Europe/Paris');
    const id = $props.id();
</script>

<div class="flex w-full max-w-xs flex-col gap-2">
    <Label for={id}>Time zone</Label>
    <NativeSelect.Root {id} name="timezone" bind:value={timezone}>
        <NativeSelect.OptGroup label="Europe">
            <NativeSelect.Option value="Europe/Paris">Paris</NativeSelect.Option>
            <NativeSelect.Option value="Europe/London">London</NativeSelect.Option>
        </NativeSelect.OptGroup>
        <NativeSelect.OptGroup label="Americas">
            <NativeSelect.Option value="America/New_York">New York</NativeSelect.Option>
            <NativeSelect.Option value="America/Los_Angeles">Los Angeles</NativeSelect.Option>
        </NativeSelect.OptGroup>
    </NativeSelect.Root>
    <p class="text-sm text-foreground-muted">Selected:{timezone}</p>
</div>
