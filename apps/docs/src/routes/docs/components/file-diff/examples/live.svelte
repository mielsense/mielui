<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import type { FileDiffLine } from '@mielui/svelte/components/file-diff';
    import * as FileDiff from '@mielui/svelte/components/file-diff';

    let revised = $state(false);

    const original: FileDiffLine[] = [
        {
            type: 'add',
            newLineNumber: 1,
            content: 'const retries = 1;'
        }
    ];
    const revision: FileDiffLine[] = [
        {
            type: 'remove',
            oldLineNumber: 1,
            content: 'const retries = 1;'
        },
        {
            type: 'add',
            newLineNumber: 1,
            content: 'const retries = 3;'
        }
    ];
    const diff = $derived(revised ? revision : original);
</script>

<div class="flex w-full max-w-2xl flex-col gap-4">
    <Button
        variant="outline"
        class="w-fit"
        onclick={() => {
            revised = !revised;
        }}
    >
        {revised ? 'Show original patch' : 'Revise patch'}
    </Button>
    <FileDiff.Root file="src/config.ts" lang="ts" {diff} />
</div>
