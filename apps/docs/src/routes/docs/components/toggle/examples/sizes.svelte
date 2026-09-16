<script lang="ts">
    import { TextBoldIcon as Bold } from '@hugeicons/core-free-icons';
    import { Toggle } from '@mielui/svelte/components/toggle';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="flex gap-2">
    <Toggle size="sm">
        <HugeiconsIcon icon={Bold} size={12} />
    </Toggle>
    <Toggle>
        <HugeiconsIcon icon={Bold} size={14} />
    </Toggle>
    <Toggle size="lg">
        <HugeiconsIcon icon={Bold} size={16} />
    </Toggle>
</div>
