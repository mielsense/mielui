<script lang="ts">
    import * as Notch from '../../../../packages/mielui/src/blocks/notch/index';

    let {
        side = 'top',
        duration = 0
    }: {
        side?: 'top' | 'bottom' | 'left' | 'right';
        duration?: number;
    } = $props();
    let open = $state(false);
</script>
<div style:--motion-duration-panel="0ms">
    <button type="button" onclick={() => { open = !open; }}>Toggle accessory</button>
    <Notch.Root bind:open {side} {duration}>
        <Notch.Content aria-label="Activity"><Notch.Title>Working</Notch.Title></Notch.Content>
        <Notch.Accessory aria-label="Progress">
            <button type="button">3 of 5</button>
        </Notch.Accessory>
    </Notch.Root>
</div>
