import { untrack } from 'svelte';
import type { ThemeEditorState } from './state.svelte';

/** State that describes how the page looks, not what the person has made. */
const transient = new Set<keyof ThemeEditorState>([
    'pendingPreset',
    'presetDialogOpen',
    'hydrated',
    'appliedDark',
    'appliedRevision',
    'setupOpen'
]);

const LIMIT = 100;
/** Edits closer together than this, such as one slider drag, undo as a single step. */
const BURST = 400;
/** Fonts and stored drafts settle just after load. Changes in this window are not edits. */
const SETTLE = 600;

/**
 * Records every change to the draft so it can be undone and redone.
 *
 * A step is one burst of edits: a whole drag, a preset switch, or a reset.
 */
export function createThemeHistory(state: ThemeEditorState) {
    let undoStack = $state<string[]>([]);
    let redoStack = $state<string[]>([]);
    let last: string | undefined;
    let restoring = false;
    let inBurst = false;
    let burstTimer: ReturnType<typeof setTimeout> | undefined;
    let ready = false;
    let readyTimer: ReturnType<typeof setTimeout> | undefined;

    function capture() {
        const snapshot = $state.snapshot(state) as Record<string, unknown>;
        const draft: Record<string, unknown> = {};
        for (const key of Object.keys(snapshot)) {
            if (!transient.has(key as keyof ThemeEditorState)) {
                draft[key] = snapshot[key];
            }
        }

        return JSON.stringify(draft);
    }

    function restore(snapshot: string) {
        restoring = true;
        inBurst = false;
        clearTimeout(burstTimer);
        Object.assign(state, JSON.parse(snapshot));
    }

    $effect(() => {
        if (!state.hydrated) {
            return;
        }
        const next = capture();
        untrack(() => {
            if (last === undefined) {
                last = next;
                readyTimer = setTimeout(() => {
                    ready = true;
                }, SETTLE);

                return;
            }
            if (next === last) {
                return;
            }
            if (restoring || !ready) {
                restoring = false;
                last = next;

                return;
            }
            if (!inBurst) {
                undoStack = [...undoStack.slice(1 - LIMIT), last];
                redoStack = [];
            }
            last = next;
            inBurst = true;
            clearTimeout(burstTimer);
            burstTimer = setTimeout(() => {
                inBurst = false;
            }, BURST);
        });

        return () => {
            clearTimeout(burstTimer);
            clearTimeout(readyTimer);
        };
    });

    function undo() {
        const previous = undoStack.at(-1);
        if (previous === undefined || last === undefined) {
            return;
        }
        redoStack = [...redoStack, last];
        undoStack = undoStack.slice(0, -1);
        restore(previous);
    }

    function redo() {
        const next = redoStack.at(-1);
        if (next === undefined || last === undefined) {
            return;
        }
        undoStack = [...undoStack, last];
        redoStack = redoStack.slice(0, -1);
        restore(next);
    }

    return {
        undo,
        redo,
        get canUndo() {
            return undoStack.length > 0;
        },
        get canRedo() {
            return redoStack.length > 0;
        }
    };
}
