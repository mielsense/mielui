<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { Gauge } from '@mielui/svelte/components/gauge';
    import * as Notch from '@mielui/svelte/components/notch';

    let open = $state(false);
    let expanded = $state(false);
    const files = [
        { name: 'Revenue.csv', size: '42 KB' },
        { name: 'Subscribers.csv', size: '18 KB' },
        { name: 'Summary.pdf', size: '96 KB' }
    ];

    function openActivity() {
        open = true;
    }

    function toggleExpanded() {
        expanded = !expanded;
    }
</script>
<Button onclick={openActivity}>Show export activity</Button>
<Notch.Root bind:open side="top" duration={0}>
    <Notch.SideAction
        side="end"
        aria-label={expanded ? 'Hide export files' : 'Show export files'}
        aria-expanded={expanded}
        onclick={toggleExpanded}
    >
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            class="size-4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
        >
            <path d={expanded ? 'M5 12h14' : 'M5 12h14M12 5v14'} />
        </svg>
    </Notch.SideAction>
    <Notch.Content aria-label="Export activity" class={expanded ? 'w-112 gap-4' : 'w-84 gap-3'}>
        <div class="flex items-center gap-3">
            <Gauge value={100} size={36} tone="success" label="Export complete" />
            <Notch.Header class="min-w-0 flex-1 gap-0.5 pr-0">
                <Notch.Title class="text-sm">Export ready</Notch.Title>
                <Notch.Description class="text-xs">3 reports · 156 KB</Notch.Description>
            </Notch.Header>
        </div>
        {#if expanded}
            <ul class="divide-y divide-border text-sm">
                {#each files as file (file.name)}
                    <li class="flex items-center justify-between gap-4 py-3">
                        <span>{file.name}</span>
                        <span class="text-xs tabular-nums text-foreground-muted">{file.size}</span>
                    </li>
                {/each}
            </ul>
        {/if}
    </Notch.Content>
    <Notch.Accessory class="text-xs tabular-nums text-foreground-muted">
        3 of 3 exported
    </Notch.Accessory>
</Notch.Root>
