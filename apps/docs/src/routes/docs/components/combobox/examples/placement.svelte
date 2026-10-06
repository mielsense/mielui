<script lang="ts">
    import * as Combobox from '@mielui/svelte/components/combobox';

    const sizes = ['Small', 'Medium', 'Large', 'Extra large'];
    let loads = $state(0);
</script>

<div class="flex flex-col items-center gap-3">
    <Combobox.Root placement="top-start">
        <Combobox.Trigger
            placeholder="Opens above"
            class="w-56"
            onopen={() => {
                loads += 1;
            }}
        />
        <Combobox.Content>
            <Combobox.Results>
                {#each sizes as size (size)}
                    <Combobox.Item value={size} label={size} />
                {/each}
            </Combobox.Results>
        </Combobox.Content>
    </Combobox.Root>
    <p class="text-sm text-foreground-muted">Options requested {loads} times</p>
</div>
