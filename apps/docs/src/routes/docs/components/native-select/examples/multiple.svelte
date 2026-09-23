<script lang="ts">
    import { Label } from '@mielui/svelte/components/label';
    import * as NativeSelect from '@mielui/svelte/components/native-select';

    const id = $props.id();
    let days = $state(['monday', 'wednesday']);
</script>

<div class="flex w-full max-w-xs flex-col gap-2">
    <Label for={id}>Office days</Label>
    <NativeSelect.Root {id} name="days" multiple size={4} bind:value={days}>
        <NativeSelect.Option value="monday">Monday</NativeSelect.Option>
        <NativeSelect.Option value="tuesday">Tuesday</NativeSelect.Option>
        <NativeSelect.Option value="wednesday">Wednesday</NativeSelect.Option>
        <NativeSelect.Option value="thursday">Thursday</NativeSelect.Option>
    </NativeSelect.Root>
    <p class="text-sm text-foreground-muted">
        {days.length} days selected. Use your platform's modifier keys to select several options.
    </p>
</div>
