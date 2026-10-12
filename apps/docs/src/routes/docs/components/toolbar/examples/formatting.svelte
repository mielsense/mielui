<script lang="ts">
    import * as Toolbar from '@mielui/svelte/components/toolbar';

    let formats = $state<string[]>(['bold']);
</script>
<div class="flex flex-col items-center gap-4">
    <Toolbar.Root aria-label="Text formatting">
        <Toolbar.Group type="multiple" bind:value={formats} aria-label="Text styles">
            <Toolbar.Item value="bold">Bold</Toolbar.Item>
            <Toolbar.Item value="italic">Italic</Toolbar.Item>
            <Toolbar.Item value="underline">Underline</Toolbar.Item>
        </Toolbar.Group>
        <Toolbar.Separator />
        <Toolbar.Button
            onclick={() => {
                formats = [];
            }}
        >
            Clear
        </Toolbar.Button>
    </Toolbar.Root>
    <p
        class={[
            'text-sm',
            {
                'font-bold': formats.includes('bold'),
                italic: formats.includes('italic'),
                underline: formats.includes('underline')
            }
        ]}
    >
        A note for the team.
    </p>
</div>
