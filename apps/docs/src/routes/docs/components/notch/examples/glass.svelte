<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { Gauge } from '@mielui/svelte/components/gauge';
    import * as Notch from '@mielui/svelte/components/notch';

    let open = $state(false);
    function showGlass() {
        open = true;
    }
</script>
<Button variant="secondary" onclick={showGlass}>Show glass notch</Button>
<Notch.Root bind:open surface="glass" side="top">
    <Notch.Content
        aria-label="Workspace usage"
        class="w-80 flex-row items-center justify-between gap-4 px-8 py-5"
    >
        <Notch.Header class="gap-1 pr-0">
            <Notch.Title class="text-xs text-foreground-muted">Usage</Notch.Title>
        </Notch.Header>
        <Gauge value={41} size={40} label="Storage used" />
        <Notch.Description class="text-xs">Storage</Notch.Description>
    </Notch.Content>
</Notch.Root>
