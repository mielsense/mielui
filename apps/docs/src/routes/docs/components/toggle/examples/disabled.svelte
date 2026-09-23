<script lang="ts">
    import { TextBoldIcon as Bold } from '@hugeicons/core-free-icons';
    import { Toggle } from '@mielui/svelte/components/toggle';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<Toggle aria-label="Bold" disabled>
    <HugeiconsIcon icon={Bold} size={14} />
</Toggle>
