<script lang="ts">
    import { TextBoldIcon as Bold } from '@hugeicons/core-free-icons';
    import { Toggle } from '@mielui/svelte/components/toggle';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let bold = $state(true);
</script>

<Toggle bind:pressed={bold} aria-label="Bold">
    <HugeiconsIcon icon={Bold} size={14} />
</Toggle>
