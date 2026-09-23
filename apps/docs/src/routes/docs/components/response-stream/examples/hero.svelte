<script lang="ts">
    import { ResponseStream } from '@mielui/svelte/components/response-stream';

    import { onDestroy } from 'svelte';

    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let settle: (() => void) | undefined;

    onDestroy(() => {
        stopped = true;
        clearTimeout(timer);
        settle?.();
    });

    const text =
        'The release contains twelve changes. Two affect keyboard navigation, four update the documentation, and six fix existing behavior. Keep the current API unchanged, run the component checks, then review the preview before deploying. The rollback is the previous release tag.';

    function wait(ms: number) {
        return new Promise<void>((resolve) => {
            settle = resolve;
            timer = setTimeout(() => {
                settle = undefined;
                resolve();
            }, ms);
        });
    }

    async function* delayedResponse() {
        await wait(1200);

        const parts = text.split(/(\s+)/);
        for (const part of parts) {
            if (stopped) {
                return;
            }
            yield part;
            await wait(40);
        }
    }
</script>

<div class="w-full max-w-xl">
    <ResponseStream textStream={delayedResponse()} speed={10} />
</div>
