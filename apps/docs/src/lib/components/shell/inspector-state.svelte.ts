import { onMount } from 'svelte';

export function createInspectorState(getStorageKey: () => string) {
    let open = $state(false);
    let pinned = $state(false);
    let preferenceLoaded = false;

    function persistPreference() {
        if (!preferenceLoaded) {
            return;
        }
        try {
            localStorage.setItem(getStorageKey(), String(pinned));
        } catch {
            // Storage may be unavailable; the panel still works for this session.
        }
    }

    onMount(() => {
        try {
            pinned = localStorage.getItem(getStorageKey()) === 'true';
        } catch {
            pinned = false;
        }
        open = pinned;
        preferenceLoaded = true;
    });

    return {
        get open() {
            return open;
        },
        set open(value: boolean) {
            open = pinned || value;
        },
        get pinned() {
            return pinned;
        },
        togglePin() {
            pinned = !pinned;
            open = true;
            persistPreference();
        },
        dismiss() {
            if (!pinned) {
                open = false;
            }
        },
        close() {
            pinned = false;
            open = false;
            persistPreference();
        },
        reveal(event: PointerEvent) {
            if (event.pointerType === 'mouse' && event.clientX <= 12) {
                open = true;
            }
        }
    };
}
