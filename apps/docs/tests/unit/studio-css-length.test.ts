import { afterEach, describe, expect, it, vi } from 'vitest';
import { parsePxLength } from '../../src/lib/studio-advanced-tokens/css-length';

const empty = () => {
    return '';
};

const originalFontSize = document.documentElement.style.fontSize;
afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.style.fontSize = originalFontSize;
});

describe('Studio CSS length evaluation', () => {
    it.each([
        ['calc(2px + 3px * 4)', 14],
        ['calc((2px + 3px) * 4)', 20],
        ['calc(24px / 3 / 2)', 4],
        ['calc(20px - 3px * 2)', 14],
        ['calc(2 * calc(3px + (4px * 2)))', 22],
        ['calc(-2px + 5px)', 3],
        ['calc(1px / 0)', 0],
        ['calc(2px +)', 0],
        ['calc((2px + 3px)', 0]
    ])('evaluates %s as %s', (input, expected) => {
        expect(parsePxLength(input, empty)).toBe(expected);
    });

    it('resolves repeated variables independently and stops cycles', () => {
        const tokens: Record<string, string> = {
            '--space': '3px',
            '--cycle': 'var(--other)',
            '--other': 'var(--cycle)'
        };
        const resolve = (name: string) => {
            return tokens[name] ?? '';
        };
        expect(parsePxLength('calc(var(--space) + var(--space) * 2)', resolve)).toBe(9);
        expect(parsePxLength('var(--cycle)', resolve)).toBe(0);
        expect(parsePxLength('var(--missing, calc(2px + 3px * 4))', resolve)).toBe(14);
    });

    it('uses the current document root size for rem lengths', () => {
        document.documentElement.style.fontSize = '20px';
        expect(parsePxLength('calc(1.5rem + 2px)', empty)).toBe(32);
        document.documentElement.style.fontSize = '18px';
        expect(parsePxLength('1rem', empty)).toBe(18);
    });

    it('uses a stable rem fallback without a document', () => {
        vi.stubGlobal('document', undefined);
        expect(parsePxLength('1.5rem', empty)).toBe(24);
    });
});
