<script lang="ts">
    import { Input } from '@mielui/svelte/components/input';
    import { Label } from '@mielui/svelte/components/label';
</script>

<div class="flex flex-col gap-1.5">
    <Label for="email">Email address</Label>
    <Input id="email" type="email" placeholder="you@ui.miel.my" />
</div>
