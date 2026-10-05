<script lang="ts">
    import { Input } from '@mielui/svelte/components/input';
    import { Label } from '@mielui/svelte/components/label';
</script>

<div class="flex flex-col gap-1.5">
    <Label for="name">
        Full name
        <span aria-hidden="true" class="text-[var(--mielui-error-text)]">*</span>
    </Label>
    <Input id="name" type="text" required />
</div>
