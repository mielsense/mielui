<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { Gauge } from '@mielui/svelte/components/gauge';
    import * as Notch from '@mielui/svelte/components/notch';

    let open = $state(false);
    let side = $state<'top' | 'bottom' | 'left' | 'right'>('top');
    const sides = ['top', 'bottom', 'left', 'right'] as const;
    const lateral = $derived(side === 'left' || side === 'right');

    function show(value: typeof side) {
        side = value;
        open = true;
    }
</script>

<div class="flex flex-wrap justify-center gap-2">
    {#each sides as position (position)}
        <Button variant="secondary" onclick={() => show(position)}>
            {position[0].toUpperCase() + position.slice(1)}
        </Button>
    {/each}
</div>
<Notch.Root bind:open {side}>
    <Notch.Content
        aria-label="Files synchronized"
        class={lateral ? 'w-28 min-h-64 items-center justify-center gap-5 px-4 py-7 text-center' : 'w-80 flex-row items-center gap-3 px-7 py-4'}
    >
        <Gauge value={100} size={36} tone="success" label="Sync complete" />
        <Notch.Header class={lateral ? 'gap-0.5 pr-0' : 'min-w-0 flex-1 gap-0.5 pr-6'}>
            <Notch.Title class="text-sm">{lateral ? 'Synced' : 'All synced'}</Notch.Title>
            <Notch.Description class="text-xs">Just now</Notch.Description>
        </Notch.Header>
        {#if lateral}
            <div class="flex flex-col items-center gap-2">
                <Gauge value={41} size={36} label="Storage used" />
                <span class="text-xs text-foreground-muted">Storage</span>
            </div>
        {/if}
    </Notch.Content>
</Notch.Root>
