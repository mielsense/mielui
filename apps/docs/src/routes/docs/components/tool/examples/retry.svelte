<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Tool from '@mielui/svelte/components/tool';
    import { onDestroy } from 'svelte';

    let state = $state<'error' | 'running' | 'complete'>('error');
    let timer: ReturnType<typeof setTimeout> | undefined;

    function retry() {
        state = 'running';
        timer = setTimeout(() => {
            state = 'complete';
        }, 1200);
    }

    onDestroy(() => {
        clearTimeout(timer);
    });
</script>

<div class="w-full max-w-xl space-y-3">
    <Tool.Root name="Check release notes" {state} composed open>
        <Tool.Trigger />
        <Tool.Content>
            <Tool.Input><code>read release-notes.md</code></Tool.Input>
            <Tool.Output>
                {state === 'error' ? 'The file service timed out.' : state === 'running' ? 'Reading the file…' : 'Found 12 changes. No breaking API changes.'}
            </Tool.Output>
        </Tool.Content>
    </Tool.Root>
    <Button variant="secondary" onclick={retry} disabled={state !== 'error'}>
        Retry file read
    </Button>
</div>
