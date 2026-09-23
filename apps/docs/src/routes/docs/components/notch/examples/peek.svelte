<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { Gauge } from '@mielui/svelte/components/gauge';
    import * as Notch from '@mielui/svelte/components/notch';

    let enabled = $state(false);
    function togglePeek() {
        enabled = !enabled;
    }
</script>

<Button variant="secondary" onclick={togglePeek}>
    {enabled ? 'Remove activity rail' : 'Pin activity rail'}
</Button>
{#if enabled}
    <Notch.Root mode="peek" side="bottom">
        <Notch.Content
            aria-label="Workspace activity"
            class="w-80 flex-row items-center justify-around gap-8 px-8 py-5 text-center"
        >
            <div class="flex flex-col items-center gap-2">
                <Gauge value={72} size={40} label="Upload progress" />
                <span class="text-xs text-foreground-muted">Uploads</span>
            </div>
            <div class="flex flex-col items-center gap-2">
                <Gauge value={41} size={40} label="Storage used" tone="success" />
                <span class="text-xs text-foreground-muted">Storage</span>
            </div>
        </Notch.Content>
    </Notch.Root>
{/if}
