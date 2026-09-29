import { describe, expect, it } from 'vitest';
import { parseInlineText } from '../../src/lib/components/docs/inline-text';

describe('Inline documentation text', () => {
    it('preserves spaces around code and links', () => {
        expect(parseInlineText('Use `value` and [the guide](/docs/guide).')).toEqual([
            { kind: 'text', value: 'Use ' },
            { kind: 'code', value: 'value' },
            { kind: 'text', value: ' and ' },
            { kind: 'link', value: 'the guide', href: '/docs/guide' },
            { kind: 'text', value: '.' }
        ]);
    });

    it('does not treat link syntax inside code as a link', () => {
        expect(parseInlineText('`[label](/route)`')).toEqual([
            { kind: 'code', value: '[label](/route)' }
        ]);
    });

    it('keeps unmatched syntax and resets matching between calls', () => {
        expect(parseInlineText('`first`')).toEqual([{ kind: 'code', value: 'first' }]);
        expect(parseInlineText('`second`')).toEqual([{ kind: 'code', value: 'second' }]);
        expect(parseInlineText('An unmatched `code')).toEqual([
            { kind: 'text', value: 'An unmatched `code' }
        ]);
        expect(parseInlineText('')).toEqual([]);
    });
});
