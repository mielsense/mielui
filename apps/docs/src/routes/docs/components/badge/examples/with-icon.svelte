<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
    import PencilIcon from './pencil-icon.svelte';
</script>

<div class="flex flex-wrap items-center gap-2">
    <Badge icon={PencilIcon}>Draft</Badge>
    <Badge variant="outline" icon={PencilIcon} iconSize={12}>Edited</Badge>
</div>
