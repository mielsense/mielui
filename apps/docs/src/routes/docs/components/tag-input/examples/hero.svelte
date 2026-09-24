<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Button } from '@mielui/svelte/components/button';
    import * as TagInput from '@mielui/svelte/components/tag-input';

    let tags = $state(['svelte', 'design-system']);
    let saved = $state<string[]>([]);
    let message = $state('');
    function save() {
        saved = [...tags];
        message = saved.length ? `Saved topics: ${saved.join(', ')}.` : 'Saved without topics.';
    }
</script>

<div class="w-full max-w-md space-y-4">
    <TagInput.Root bind:tags label="Topics" description="Type a topic and press Enter.">
        <TagInput.List />
        <TagInput.Input placeholder="Add a topic…" />
    </TagInput.Root>

    <div class="flex items-center justify-between gap-3">
        <p class="text-sm text-foreground-muted">
            <span use:numberShuffle={{ value: tags.length }}>{tags.length}</span> topics
        </p>
        <div class="flex gap-2">
            <Button
                variant="ghost"
                size="md"
                onclick={() => {
                    tags = [];
                }}
            >
                Clear
            </Button>
            <Button size="md" onclick={save}>Save</Button>
        </div>
    </div>
    <p role="status" class="text-sm text-foreground-muted">{message}</p>
</div>
