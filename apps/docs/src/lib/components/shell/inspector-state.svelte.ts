import { onMount } from 'svelte';

export function createInspectorState(getStorageKey: () => string) {
    let open = $state(false);
    let preference = $state(false);
    let docked = $state(false);
    const pinned = $derived(preference && docked);
    let preferenceLoaded = false;

    function persistPreference() {
        if (!preferenceLoaded) {
            return;
        }
        try {
            localStorage.setItem(getStorageKey(), String(preference));
        } catch {
            // Storage may be unavailable; the panel still works for this session.
        }
    }

    onMount(() => {
        const dockable = window.matchMedia('(min-width: 64rem)');
        try {
            preference = localStorage.getItem(getStorageKey()) !== 'false';
        } catch {
            preference = true;
        }
        docked = dockable.matches;
        open = pinned;
        preferenceLoaded = true;

        function syncDocked(event: MediaQueryListEvent) {
            docked = event.matches;
            open = pinned;
        }

        dockable.addEventListener('change', syncDocked);
        return () => {
            dockable.removeEventListener('change', syncDocked);
        };
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
        get dockable() {
            return docked;
        },
        togglePin() {
            preference = !pinned;
            open = true;
            persistPreference();
        },
        dismiss() {
            if (!pinned) {
                open = false;
            }
        },
        close() {
            open = false;
            if (!docked) {
                return;
            }
            preference = false;
            persistPreference();
        },
        reveal(event: PointerEvent) {
            if (event.pointerType === 'mouse' && event.clientX <= 12) {
                open = true;
            }
        }
    };
}
