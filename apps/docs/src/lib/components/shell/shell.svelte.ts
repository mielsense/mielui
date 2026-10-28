import { createContext } from 'svelte';
import type { PageOutline } from '$lib/components/docs/page-outline.svelte';

export function createShell() {
    let outline = $state.raw<PageOutline>();

    return {
        /** The outline of the docs page on screen, for the section trail beside Copy page. */
        get outline() {
            return outline;
        },
        set outline(next: PageOutline | undefined) {
            outline = next;
        }
    };
}

export type Shell = ReturnType<typeof createShell>;

export const [getShell, setShell] = createContext<Shell>();
