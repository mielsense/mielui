<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Group from '@mielui/svelte/components/group';
    import { Input } from '@mielui/svelte/components/input';

    let email = $state('');
</script>

<Group.Root aria-label="Email subscription" class="w-full max-w-sm">
    <Input type="email" aria-label="Email address" placeholder="Email address" bind:value={email} />
    <Group.Separator />
    <Button variant="outline" disabled={!email}>Subscribe</Button>
</Group.Root>
