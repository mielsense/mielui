<script lang="ts">
    import {
        TextAlignCenterIcon as AlignCenter,
        TextAlignLeftIcon as AlignLeft,
        TextAlignRightIcon as AlignRight
    } from '@hugeicons/core-free-icons';
    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let alignment = $state('center');
</script>

<ToggleGroup.Root type="single" bind:value={alignment}>
    <ToggleGroup.Item value="left" aria-label="Align left">
        <HugeiconsIcon icon={AlignLeft} size={14} />
    </ToggleGroup.Item>
    <ToggleGroup.Item value="center" aria-label="Align center">
        <HugeiconsIcon icon={AlignCenter} size={14} />
    </ToggleGroup.Item>
    <ToggleGroup.Item value="right" aria-label="Align right">
        <HugeiconsIcon icon={AlignRight} size={14} />
    </ToggleGroup.Item>
</ToggleGroup.Root>
