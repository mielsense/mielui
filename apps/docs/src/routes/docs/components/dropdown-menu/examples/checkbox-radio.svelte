<script lang="ts">
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';

    let wrap = $state(true);
    let minimap = $state(false);
    let density = $state('comfortable');
    let lastChange = $state('No changes yet');
</script>

<div class="flex flex-col items-center gap-3">
    <DropdownMenu.Root>
        <DropdownMenu.Trigger variant="outline">View options</DropdownMenu.Trigger>
        <DropdownMenu.Content class="min-w-[13rem]">
            <DropdownMenu.Label>Editor</DropdownMenu.Label>
            <DropdownMenu.CheckboxItem
                bind:checked={wrap}
                onCheckedChange={(checked) => {
                    lastChange = `Word wrap ${checked ? 'on' : 'off'}`;
                }}
            >
                Word wrap
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem bind:checked={minimap}>Minimap</DropdownMenu.CheckboxItem>
            <DropdownMenu.Separator />
            <DropdownMenu.Label>Density</DropdownMenu.Label>
            <DropdownMenu.RadioGroup
                bind:value={density}
                onValueChange={(value) => {
                    lastChange = `Density set to ${value}`;
                }}
            >
                <DropdownMenu.RadioItem value="compact">Compact</DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="comfortable">Comfortable</DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="spacious">Spacious</DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
    <p class="text-sm text-foreground-muted">{lastChange}</p>
</div>
