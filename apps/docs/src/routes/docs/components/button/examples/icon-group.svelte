<script lang="ts">
    import Trash from '@hugeicons/core-free-icons/Delete02Icon';
    import Download from '@hugeicons/core-free-icons/Download01Icon';
    import Send from '@hugeicons/core-free-icons/SentIcon';
    import { Button } from '@mielui/svelte/components/button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="flex items-center gap-2">
    <Button variant="ghost"><HugeiconsIcon icon={Download} size={14} /></Button>
    <Button variant="ghost"><HugeiconsIcon icon={Send} size={14} /></Button>
    <Button variant="ghost"><HugeiconsIcon icon={Trash} size={14} /></Button>
</div>
