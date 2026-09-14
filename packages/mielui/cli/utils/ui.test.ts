import { describe, expect, test } from 'bun:test';
import { BANNER } from './ui';

describe('CLI banner', () => {
    test('spells MIELUI', () => {
        expect(BANNER.join('\n')).toMatchInlineSnapshot(`
"█   █  ███  ████  █     █   █  ███
██ ██   █   █     █     █   █   █
█ █ █   █   ███   █     █   █   █
█   █   █   █     █     █   █   █
█   █  ███  ████  ████   ███   ███"
`);
    });
});
