import { onDestroy, untrack } from 'svelte';

type DisclosureOptions = {
    readonly open: boolean;
    readonly onOpenChange: ((open: boolean) => void) | undefined;
    readonly onOpenChangeComplete: ((open: boolean) => void) | undefined;
};

export function createDisclosureLifecycle(options: DisclosureOptions) {
    let contentRegistered = false;
    let initialized = false;
    let previousOpen = options.open;
    let revision = 0;
    let disposed = false;
    let pending: { open: boolean; revision: number } | undefined;

    function transitionComplete(nextOpen: boolean, completedRevision: number) {
        if (disposed || pending?.open !== nextOpen || pending.revision !== completedRevision) {
            return;
        }
        const completion = pending;
        queueMicrotask(() => {
            if (disposed || pending !== completion || options.open !== nextOpen) {
                return;
            }
            pending = undefined;
            options.onOpenChangeComplete?.(nextOpen);
        });
    }

    function completeWithoutContent() {
        if (!contentRegistered && pending) {
            transitionComplete(pending.open, pending.revision);
        }
    }

    $effect.pre(() => {
        const nextOpen = options.open;
        if (!initialized) {
            initialized = true;
            previousOpen = nextOpen;
            return;
        }
        if (nextOpen === previousOpen) {
            return;
        }
        previousOpen = nextOpen;
        revision += 1;
        pending = { open: nextOpen, revision };
        untrack(() => {
            options.onOpenChange?.(nextOpen);
            completeWithoutContent();
        });
    });

    onDestroy(() => {
        disposed = true;
        pending = undefined;
    });

    return {
        registerContent() {
            if (contentRegistered) {
                throw new Error('A disclosure root supports exactly one content part.');
            }
            contentRegistered = true;
            return () => {
                contentRegistered = false;
                completeWithoutContent();
            };
        },
        transitionStart(nextOpen: boolean) {
            return pending?.open === nextOpen ? pending.revision : revision;
        },
        transitionComplete
    };
}
