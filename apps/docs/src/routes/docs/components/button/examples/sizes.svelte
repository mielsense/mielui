<script lang="ts">
    import Heart from '@hugeicons/core-free-icons/FavouriteIcon';
    import { Button } from '@mielui/svelte/components/button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="flex flex-wrap items-center justify-center gap-4">
    <Button size="sm">Small</Button>
    <Button>Medium</Button>
    <Button size="lg">Large</Button>
    <Button size="icon"><HugeiconsIcon icon={Heart} size={14} /></Button>
</div>
