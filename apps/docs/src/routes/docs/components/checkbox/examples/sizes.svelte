<script lang="ts">
    import { Checkbox } from '@mielui/svelte/components/checkbox';
</script>

<div class="flex flex-wrap items-center gap-6">
    <Checkbox size="sm" label="Small · 14px" />
    <Checkbox size="md" label="Medium · 18px" checked />
    <Checkbox size="lg" label="Large · 22px" checked />
</div>
