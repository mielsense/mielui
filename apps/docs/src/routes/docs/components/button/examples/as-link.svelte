<script lang="ts">
    import External from '@hugeicons/core-free-icons/LinkSquare02Icon';
    import { Button } from '@mielui/svelte/components/button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<Button href="/docs" variant="outline">
    <HugeiconsIcon icon={External} size={13} />
    Open docs
</Button>
