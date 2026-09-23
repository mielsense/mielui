<script lang="ts">
    import { Input } from '@mielui/svelte/components/input';
    import { Label } from '@mielui/svelte/components/label';
</script>

<div class="flex flex-col gap-1.5">
    <Label for="disabled" class="cursor-not-allowed opacity-[var(--opacity-disabled)]">
        Username
    </Label>
    <Input id="disabled" type="text" disabled />
</div>
