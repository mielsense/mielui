import { toast } from '@mielui/svelte/components/toast';
import { parseTheme, type Theme } from '@mielui/svelte/themes/theme';
import { readSharedTheme, SHARE_HASH_PREFIX, themeShareLink } from './share';

/** Holds the theme a share link brought in, and the link that shares the current draft. */
export function createThemeShare(options: {
    /** The current draft as JSON, which the share link carries. */
    json: () => string;
    /** Loads an accepted shared theme into the draft. */
    apply: (theme: Theme) => void;
}) {
    let sharedTheme = $state<Theme | null>(null);
    let link = $state('');

    $effect(() => {
        const hash = window.location.hash;
        if (!hash.startsWith(SHARE_HASH_PREFIX)) {
            return;
        }
        window.history.replaceState(
            window.history.state,
            '',
            window.location.pathname + window.location.search
        );
        void readSharedTheme(hash)
            .then((json) => {
                sharedTheme = json ? parseTheme(JSON.parse(json)) : null;
            })
            .catch(() => {
                toast.error('That theme link could not be read');
            });
    });

    $effect(() => {
        const json = options.json();
        let current = true;
        void themeShareLink(json, window.location.origin)
            .then((nextLink) => {
                if (current) {
                    link = nextLink;
                }
            })
            .catch(() => {
                if (current) {
                    link = '';
                }
            });

        return () => {
            current = false;
        };
    });

    function accept() {
        if (!sharedTheme) {
            return;
        }
        const theme = sharedTheme;
        sharedTheme = null;
        options.apply(theme);
        toast.success('Shared theme loaded');
    }

    function dismiss() {
        sharedTheme = null;
    }

    return {
        accept,
        dismiss,
        get sharedTheme() {
            return sharedTheme;
        },
        get link() {
            return link;
        }
    };
}
