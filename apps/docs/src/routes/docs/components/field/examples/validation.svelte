<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Field from '@mielui/svelte/components/field';
    import { Input } from '@mielui/svelte/components/input';

    let showIssue = $state(true);
</script>

<div class="flex w-full max-w-sm flex-col gap-5">
    <Field.Root issues={showIssue ? [{ message: 'This username is already in use.' }] : []}>
        <Field.Label>Username</Field.Label>
        <Field.Description>
            Letters, numbers, and hyphens. You can change this later.
        </Field.Description>
        <Field.Control>
            {#snippet children(control)}
                <Input {...control} name="username" value="miel" autocomplete="username" />
            {/snippet}
        </Field.Control>
        <Field.Error />
    </Field.Root>
    <Button variant="outline" class="w-fit" onclick={() => { showIssue = !showIssue; }}>
        {showIssue ? 'Clear validation issue' : 'Show validation issue'}
    </Button>
</div>
