<script lang="ts">
    import Bold from '@hugeicons/core-free-icons/TextBoldIcon';
    import { Toggle } from '@mielui/svelte/components/toggle';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let bold = $state(true);
</script>

<Toggle bind:pressed={bold} aria-label="Bold">
    <HugeiconsIcon icon={Bold} size={14} />
</Toggle>
