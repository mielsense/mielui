import { DEFAULT_FONT, FONT_STORAGE_KEY, fonts, googleFontStylesheets } from '#lib/fonts.svelte.js';

/** Where `@mielui/svelte/themes/live` keeps the live theme's CSS and the id of its style tag. */
export const LIVE_THEME_KEY = 'mielui-live-theme-css-v2';
const LIVE_THEME_STYLE_ID = 'mielui-live-theme-style';

const families = Object.fromEntries(
    fonts.filter((font) => font.name !== DEFAULT_FONT).map((font) => [font.name, font.family])
);

/**
 * Applies the saved Studio theme, or else the saved docs font, before the first paint.
 * The layout hydrates the same style tag afterwards, so nothing changes once scripts load.
 * Google Fonts load only when one of those may need them.
 */
export const themeBootScript = `<script>(() => {
    function loadFonts() {
        for (const href of ${JSON.stringify(googleFontStylesheets)}) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        }
    }
    try {
        const css = localStorage.getItem(${JSON.stringify(LIVE_THEME_KEY)});
        if (css) {
            const style = document.createElement('style');
            style.id = ${JSON.stringify(LIVE_THEME_STYLE_ID)};
            style.textContent = css;
            document.head.appendChild(style);
            loadFonts();
            return;
        }
        const font = localStorage.getItem(${JSON.stringify(FONT_STORAGE_KEY)});
        const family = font && ${JSON.stringify(families)}[JSON.parse(font)];
        if (family) {
            document.documentElement.style.setProperty('--font-sans', family);
            loadFonts();
        }
    } catch {}
})();</script>`;
