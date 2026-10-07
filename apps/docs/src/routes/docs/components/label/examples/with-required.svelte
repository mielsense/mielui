<script lang="ts">
    import { Input } from '@mielui/svelte/components/input';
    import { Label } from '@mielui/svelte/components/label';
</script>

<div class="flex flex-col gap-1.5">
    <Label for="name" required>Full name</Label>
    <Input id="name" type="text" required />
</div>
