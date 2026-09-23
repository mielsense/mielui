<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { Markdown } from '@mielui/svelte/components/markdown';
    import { onDestroy } from 'svelte';

    const response = `## Incident update

The elevated error rate is isolated to image transformations in \`fra1\`. Cached images remain available, and requests in other regions are healthy.

### What we checked

- Cache hit rate remains above **98%**.
- Origin latency is within the normal range.
- Transformation workers restart when memory reaches their limit.

| Signal | Before | Current |
| --- | --- | --- |
| Error rate | 4.2% | 0.8% |
| Worker concurrency | 12 | 8 |
| Queue age | 42 seconds | 9 seconds |

### Apply the change

\`\`\`ts
const worker = {
    concurrency: 8,
    retries: 2,
    timeout: 30_000
};
\`\`\`

> Keep the previous configuration available until the queue has drained.

### Next checks

1. Compare the next five minutes against the baseline.
2. Confirm that worker restarts have stopped.
3. Restore concurrency gradually after memory use stabilizes.

**Owner:** Platform team. The incident stays open until the error rate is back below 0.1%.
    `;
    let content = $state('');
    let streaming = $state(false);
    let timer: ReturnType<typeof setInterval> | undefined;

    function stop() {
        clearInterval(timer);
        streaming = false;
    }

    function start() {
        stop();
        content = '';
        streaming = true;
        timer = setInterval(() => {
            content = response.slice(0, content.length + 28);
            if (content.length === response.length) {
                stop();
            }
        }, 45);
    }

    onDestroy(stop);
</script>

<div class="w-full max-w-2xl space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
        <p role="status" class="text-sm text-foreground-muted">
            {streaming ? 'Receiving response' : content.length === response.length ? 'Response complete' : content ? 'Stream stopped' : 'Start a response to watch Markdown arrive'}
        </p>
        <Button variant="secondary" onclick={streaming ? stop : start}>
            {streaming ? 'Stop stream' : content ? 'Replay response' : 'Start response'}
        </Button>
    </div>
    <div
        class="max-h-112 min-h-52 overflow-y-auto rounded-[var(--radius-xl)] border-[length:var(--border-size)] border-border bg-card p-5"
    >
        <Markdown {content} {streaming} />
    </div>
</div>
