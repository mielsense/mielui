<script lang="ts">
    import { Input } from '@mielui/svelte/components/input';
    import * as Sheet from '@mielui/svelte/components/sheet';
</script>

<Sheet.Root>
    <Sheet.Trigger variant="outline">Edit profile</Sheet.Trigger>
    <Sheet.Content allowClickOutside={false}>
        <Sheet.Header close={false}>
            <Sheet.Title>Edit profile</Sheet.Title>
            <Sheet.Description>A press on the page will not close this sheet.</Sheet.Description>
        </Sheet.Header>
        <Input label="Display name" value="Maya Reyes" />
        <Sheet.Footer>
            <Sheet.Close>Cancel</Sheet.Close>
            <Sheet.Close variant="primary">Save</Sheet.Close>
        </Sheet.Footer>
    </Sheet.Content>
</Sheet.Root>
