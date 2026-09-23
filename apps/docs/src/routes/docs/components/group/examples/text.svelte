<script lang="ts">
    import * as Group from '@mielui/svelte/components/group';
    import { Input } from '@mielui/svelte/components/input';

    const id = $props.id();
</script>

<Group.Root aria-label="Website" class="w-full max-w-xs">
    <Group.Text as="label" for={id} aria-label="Domain">https://</Group.Text>
    <Group.Separator />
    <Input {id} placeholder="example.com" />
</Group.Root>
