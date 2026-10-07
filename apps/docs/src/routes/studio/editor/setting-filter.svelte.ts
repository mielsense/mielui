import { getContext, setContext } from 'svelte';

const FILTER_KEY = Symbol('setting-filter');
const SECTION_KEY = Symbol('setting-section');

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

export function setSettingFilter(filter: SettingFilter) {
    setContext(FILTER_KEY, filter);
}

export function getSettingFilter() {
    return getContext<SettingFilter>(FILTER_KEY);
}

export function setSettingSection(section: SettingSection) {
    setContext(SECTION_KEY, section);
}

export function getSettingSection() {
    return getContext<SettingSection | undefined>(SECTION_KEY);
}
