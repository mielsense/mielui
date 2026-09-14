<script lang="ts">
    import { Input } from '@mielui/svelte/components/input';
    import { Label } from '@mielui/svelte/components/label';
</script>

<div class="flex flex-col gap-1.5">
    <Label for="name">Full name <span class="text-error">*</span></Label>
    <Input id="name" type="text" />
</div>
