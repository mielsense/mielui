import { DEFAULT_THEME, type Theme } from '@mielui/svelte/themes/theme';

export function readThemeAppearance(theme: Theme) {
    const chrome = { ...DEFAULT_THEME.chrome, ...theme.chrome };
    const tokens = { ...DEFAULT_THEME.tokens?.shared, ...theme.tokens?.shared };
    const shadows = chrome.shadows !== false;
    const insetPosition: 'top' | 'bottom' =
        tokens['--mielui-inset-position'] === 'top' ? 'top' : 'bottom';

    return {
        borders: chrome.borders ?? 'single',
        insetPosition,
        edgeHighlight: chrome.edgeHighlight ?? 0.33,
        surfaceShadows: shadows && (chrome.surfaceShadows ?? false),
        controlShadows: shadows && (chrome.controlShadows ?? true),
        dialogShadows: shadows && (chrome.dialogShadows ?? true),
        glassSurfaces: tokens['--mielui-surface'] === 'glass',
        travelingHighlight: chrome.travelingHighlight !== false,
        primaryStroke: chrome.primaryStroke ?? true,
        interactiveCursor: chrome.interactiveCursor ?? 'default'
    };
}
