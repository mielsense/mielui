import { getContext, setContext, untrack } from 'svelte';
import { createDocsTabs } from './tabs.svelte';

const SHELL_KEY = Symbol('docs-shell');
const STORAGE_KEY = 'mielui:sidebar-collapsed';

export function createShell() {
    let collapsed = $state(false);
    const tabs = createDocsTabs();

    $effect(() => {
        untrack(() => {
            try {
                collapsed = localStorage.getItem(STORAGE_KEY) === 'true';
            } catch {
                collapsed = false;
            }
        });
    });

    function toggle() {
        collapsed = !collapsed;
        try {
            localStorage.setItem(STORAGE_KEY, String(collapsed));
        } catch {
            return;
        }
    }

    return {
        get collapsed() {
            return collapsed;
        },
        tabs,
        toggle
    };
}

export type Shell = ReturnType<typeof createShell>;

export function setShell(shell: Shell) {
    setContext(SHELL_KEY, shell);
}

export function getShell() {
    return getContext<Shell>(SHELL_KEY);
}
