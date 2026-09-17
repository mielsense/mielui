<script lang="ts">
    import * as Toolbar from '@mielui/svelte/components/toolbar';

    let format = $state<string[]>([]);
</script>
<Toolbar.Root aria-label="Text formatting" class="border border-border">
    <Toolbar.Group type="multiple" bind:value={format} aria-label="Text style">
        <Toolbar.Item value="bold" aria-label="Bold" class="font-bold">B</Toolbar.Item>
        <Toolbar.Item value="italic" aria-label="Italic" class="italic">I</Toolbar.Item>
    </Toolbar.Group>
    <Toolbar.Separator />
    <Toolbar.Button onclick={() => { format = []; }}>Clear</Toolbar.Button>
    <Toolbar.Link href="/docs/components/button">Button docs</Toolbar.Link>
</Toolbar.Root>
