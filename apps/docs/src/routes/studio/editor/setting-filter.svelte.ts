import { createContext } from 'svelte';

type SettingSection = {
    readonly title: string;
    readonly keywords: string;
    /** True when the query matches at least one row label in this group. */
    readonly labelMatch: boolean;
    register: (label: string) => () => void;
};

export function createSettingFilter() {
    let query = $state('');

    return {
        get query() {
            return query;
        },
        set query(value: string) {
            query = value;
        },
        get active() {
            return query.trim() !== '';
        },
        matches(...texts: (string | undefined)[]) {
            const needle = query.trim().toLowerCase();
            if (!needle) {
                return true;
            }

            return texts.some((text) => text?.toLowerCase().includes(needle));
        }
    };
}

export type SettingFilter = ReturnType<typeof createSettingFilter>;

export const [getSettingFilter, setSettingFilter] = createContext<SettingFilter>();

const [getSection, setSettingSection, hasSection] = createContext<SettingSection>();

/** Rows outside a section, like the token picker's, have no section to report to. */
export function getSettingSection() {
    return hasSection() ? getSection() : undefined;
}

export { setSettingSection };
