<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { ResponseStream } from '@mielui/svelte/components/response-stream';

    let run = $state(0);
    let done = $state(false);
</script>

<div class="flex w-full max-w-md flex-col gap-3 text-sm leading-relaxed">
    {#key run}
        <ResponseStream
            textStream="The export finished. 4,218 rows were written, and two rows were skipped because their dates were empty."
            speed={40}
            characterChunkSize={3}
            onComplete={() => {
                done = true;
            }}
        />
    {/key}
    <div class="flex items-center gap-3">
        <Button
            variant="outline"
            disabled={!done}
            onclick={() => {
                done = false;
                run += 1;
            }}
        >
            Replay
        </Button>
        <span class="text-foreground-muted">{done ? 'Finished' : 'Streaming'}</span>
    </div>
</div>
