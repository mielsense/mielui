<script lang="ts">
    import { LinkSquare02Icon as External } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<Button href="/docs" variant="outline">
    <HugeiconsIcon icon={External} size={13} />
    Open docs
</Button>
