<script lang="ts">
    import * as Combobox from '@mielui/svelte/components/combobox';
    import { Switch } from '@mielui/svelte/components/switch';

    let disabled = $state(false);
    let value = $state('northwind');

    const customers = [
        { value: 'northwind', label: 'Northwind Trading' },
        { value: 'halcyon', label: 'Halcyon Studio' },
        { value: 'kestrel', label: 'Kestrel Logistics' },
        { value: 'mercury', label: 'Mercury Goods' },
        { value: 'assembly', label: 'Assembly Works' }
    ];
</script>

<div class="flex justify-center">
    <div class="flex w-full max-w-[280px] flex-col gap-4">
        <Switch bind:checked={disabled} label="Disable customer selection" />
        <Combobox.Root bind:value>
            <Combobox.Trigger
                {disabled}
                appearance="input"
                placeholder="Search customers"
                class="w-full"
            />
            <Combobox.Content>
                <Combobox.Results>
                    {#each customers as item (item.value)}
                        <Combobox.Item value={item.value} label={item.label} />
                    {/each}
                </Combobox.Results>
            </Combobox.Content>
        </Combobox.Root>
    </div>
</div>
