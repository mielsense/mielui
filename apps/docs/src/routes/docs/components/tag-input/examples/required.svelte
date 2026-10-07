<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as TagInput from '@mielui/svelte/components/tag-input';

    let tags = $state<string[]>([]);
    let result = $state('Not submitted');
</script>

<form
    class="w-full max-w-md space-y-3"
    onsubmit={(event) => {
        event.preventDefault();
        result = `Submitted with ${tags.join(', ')}`;
    }}
>
    <TagInput.Root
        bind:tags
        name="reviewers"
        label="Reviewers"
        required
        requiredMessage="Add at least one reviewer."
    >
        <TagInput.List />
        <TagInput.Input placeholder="Add a reviewer" />
    </TagInput.Root>
    <div class="flex items-center justify-between gap-3">
        <p class="text-sm text-foreground-muted">{result}</p>
        <Button type="submit">Request review</Button>
    </div>
</form>
