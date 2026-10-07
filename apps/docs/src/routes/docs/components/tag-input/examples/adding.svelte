<script lang="ts">
    import * as TagInput from '@mielui/svelte/components/tag-input';

    let tags = $state(['design']);
    let query = $state('');
</script>

<div class="w-full max-w-md space-y-3">
    <TagInput.Root
        bind:tags
        bind:query
        label="Labels"
        description="Space, comma or Enter adds a label. Text is lowercased."
        delimiters={[',', ' ']}
        normalize={(tag) => tag.trim().toLowerCase()}
        addOnBlur={false}
    >
        <TagInput.List />
        <TagInput.Input placeholder="Type Bug Fix and press space" />
    </TagInput.Root>
    <p class="text-sm text-foreground-muted">Still typing: {query === '' ? 'nothing' : query}</p>
</div>
