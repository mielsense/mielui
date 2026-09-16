<script lang="ts">
    import AlignCenter from '@hugeicons/core-free-icons/TextAlignCenterIcon';
    import AlignLeft from '@hugeicons/core-free-icons/TextAlignLeftIcon';
    import AlignRight from '@hugeicons/core-free-icons/TextAlignRightIcon';
    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<ToggleGroup.Root type="single" value="center">
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
