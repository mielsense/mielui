import { describe, expect, test } from 'vitest';
import { parseCommandLine } from './terminal-manager';

describe('manual terminal command parsing', () => {
    test('parses plain, quoted, empty, and escaped arguments', () => {
        expect(parseCommandLine('pnpm add @mielui/svelte@latest')).toEqual([
            'pnpm',
            'add',
            '@mielui/svelte@latest'
        ]);
        expect(parseCommandLine(`tool "two words" '' escaped\\ value`)).toEqual([
            'tool',
            'two words',
            '',
            'escaped value'
        ]);
    });

    test.each([
        'pnpm build && rm -rf x',
        'pnpm build | tee log',
        'pnpm build > log',
        '(pnpm build)'
    ])('rejects shell syntax in %s', (command) => {
        expect(() => parseCommandLine(command)).toThrow('Run one command at a time');
    });

    test('rejects malformed input', () => {
        expect(() => parseCommandLine('')).toThrow('Enter a command');
        expect(() => parseCommandLine(`pnpm "unfinished`)).toThrow('unterminated quote');
        expect(() => parseCommandLine('pnpm unfinished\\')).toThrow('unfinished escape');
    });
});
