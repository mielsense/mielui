<script lang="ts">
    import * as Tabs from '@mielui/svelte/components/tabs';

    let { orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' } = $props();
</script>
<div
    data-testid="scaled-scroll"
    class="w-40 overflow-auto"
    style="--spacing: 3.6px; transform: scale(0.85); transform-origin: top left;"
>
    <Tabs.Root variant="segmented" value="one" {orientation}>
        <Tabs.List>
            <Tabs.Trigger value="one">First tab</Tabs.Trigger>
            <Tabs.Trigger value="two">Second tab</Tabs.Trigger>
        </Tabs.List>
    </Tabs.Root>
</div>
