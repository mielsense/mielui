<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
</script>

<div class="flex flex-wrap items-center gap-2">
    <Badge>Beta</Badge>
    <Badge class="size-6 px-0 py-0 tabular-nums">8</Badge>
    <Badge class="rounded-[var(--radius-sm)]">Draft</Badge>
    <Badge variant="outline" class="rounded-[calc(var(--radius-sm)/2)]">Live</Badge>
</div>
