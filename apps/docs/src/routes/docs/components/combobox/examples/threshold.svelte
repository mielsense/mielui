<script lang="ts">
    import * as Combobox from '@mielui/svelte/components/combobox';

    const airports = [
        { value: 'ams', label: 'Amsterdam Schiphol' },
        { value: 'ath', label: 'Athens Eleftherios Venizelos' },
        { value: 'atl', label: 'Atlanta Hartsfield-Jackson' },
        { value: 'akl', label: 'Auckland' }
    ];
</script>

<div class="grid w-full max-w-lg gap-4 sm:grid-cols-2">
    <div class="grid gap-1.5">
        <span class="text-sm text-foreground-muted">Forgiving, 0.6</span>
        <Combobox.Root>
            <Combobox.Trigger
                appearance="input"
                placeholder="Try typing amstrdm"
                threshold={0.6}
                class="w-full"
            />
            <Combobox.Content>
                <Combobox.Results>
                    {#each airports as airport (airport.value)}
                        <Combobox.Item value={airport.value} label={airport.label} />
                    {/each}
                </Combobox.Results>
            </Combobox.Content>
        </Combobox.Root>
    </div>
    <div class="grid gap-1.5">
        <span class="text-sm text-foreground-muted">Exact, 0</span>
        <Combobox.Root>
            <Combobox.Trigger
                appearance="input"
                placeholder="Try typing amstrdm"
                threshold={0}
                class="w-full"
            />
            <Combobox.Content>
                <Combobox.Results>
                    {#each airports as airport (airport.value)}
                        <Combobox.Item value={airport.value} label={airport.label} />
                    {/each}
                </Combobox.Results>
            </Combobox.Content>
        </Combobox.Root>
    </div>
</div>
