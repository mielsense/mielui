<script lang="ts">
    import * as Notch from '../../../../packages/mielui/src/blocks/notch/index';

    let {
        side = 'top',
        noMotion = false,
        tall = false,
        mode = 'triggered',
        duration = 0,
        customPeek = false,
        sideActions = false
    }: {
        side?: 'top' | 'bottom' | 'left' | 'right';
        noMotion?: boolean;
        tall?: boolean;
        mode?: 'triggered' | 'peek';
        duration?: number;
        customPeek?: boolean;
        sideActions?: boolean;
    } = $props();
    let open = $state(false);
    let expanded = $state(false);
</script>
<div style:--motion-duration-panel={noMotion ? '0ms' : '260ms'}>
    <button type="button" onclick={() => { open = !open; }}>Toggle notch</button>
    <button type="button">Outside action</button>
    <Notch.Root bind:open {side} {mode} {duration}>
        {#if customPeek}
            <Notch.Peek>3 reports</Notch.Peek>
        {/if}
        {#if sideActions}
            <Notch.SideAction side="start" aria-label="Previous task">Previous</Notch.SideAction>
            <Notch.SideAction side="end" aria-label="Next task">Next</Notch.SideAction>
        {/if}
        <Notch.Content aria-label="Task activity">
            <Notch.Header>
                <Notch.Title>Export ready</Notch.Title>
                <Notch.Description>Three reports are ready.</Notch.Description>
            </Notch.Header>
            {#if tall}
                <div class="h-[1500px]">Long activity details</div>
            {/if}
            {#if expanded}
                <p>Revenue, subscribers, and summary reports are ready to download.</p>
            {/if}
            <Notch.Actions>
                <button type="button" onclick={() => { expanded = !expanded; }}>
                    Toggle details
                </button>
            </Notch.Actions>
            <Notch.Close />
        </Notch.Content>
    </Notch.Root>
</div>
