<script lang="ts">
    import * as Group from '@mielui/svelte/components/group';

    const id = $props.id();
</script>

<Group.Root aria-label="Website" class="max-w-full">
    <Group.Text as="label" for={id} aria-label="Domain">https://</Group.Text>
    <Group.Separator />
    <input
        {id}
        placeholder="example.com"
        class="h-[var(--size-control-md)] min-w-0 rounded-[var(--radius-lg)] bg-card px-3 text-label outline-none focus-visible:shadow-[var(--focus-ring)]"
    />
</Group.Root>
