export function createSubmission() {
    let pending = $state(false);
    let failed = $state(false);
    let revision = 0;
    let disposed = false;

    function reset() {
        revision += 1;
        pending = false;
        failed = false;
    }

    $effect(() => {
        disposed = false;
        return () => {
            disposed = true;
            reset();
        };
    });

    return {
        get pending() {
            return pending;
        },
        get failed() {
            return failed;
        },
        reset,
        async run(task: () => void | Promise<void>, onError?: (error: unknown) => void) {
            if (pending || disposed) {
                return;
            }
            const request = ++revision;
            pending = true;
            failed = false;
            try {
                await task();
            } catch (error) {
                if (!disposed && request === revision) {
                    failed = true;
                    onError?.(error);
                }
            } finally {
                if (!disposed && request === revision) {
                    pending = false;
                }
            }
        }
    };
}
