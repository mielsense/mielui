import {
    applyLiveThemeCss,
    loadStudioTheme,
    saveLocalTheme,
    saveStudioTheme
} from '@mielui/svelte/themes/live';
import { DEFAULT_THEME } from '@mielui/svelte/themes/theme';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('$app/environment', () => ({ browser: true }));

afterEach(() => {
    vi.restoreAllMocks();
    document.getElementById('mielui-live-theme-style')?.remove();
});

describe('theme persistence failures', () => {
    it('loads defaults when storage access is blocked', () => {
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
            throw new DOMException('Blocked', 'SecurityError');
        });
        vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
            throw new DOMException('Blocked', 'SecurityError');
        });
        expect(loadStudioTheme()).toBeNull();
    });

    it('keeps the live theme usable when autosave exceeds quota', () => {
        vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new DOMException('Full', 'QuotaExceededError');
        });
        expect(() => saveStudioTheme(DEFAULT_THEME)).not.toThrow();
        expect(() => applyLiveThemeCss(':root { --color-primary: red; }')).not.toThrow();
        expect(document.getElementById('mielui-live-theme-style')?.textContent).toContain(
            '--color-primary: red'
        );
        expect(() => saveLocalTheme(DEFAULT_THEME)).toThrow('Could not save themes on this device');
    });
});
