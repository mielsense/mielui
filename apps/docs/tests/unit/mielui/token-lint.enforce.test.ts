import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { lintTree } from '../../../../../tools/token-lint/index';

describe('token-lint enforcement', () => {
    it('components contain no un-disabled literal/primitive violations', () => {
        const v = ['components', 'ai-components', 'blocks', 'chart-components'].flatMap(
            (category) => lintTree(resolve(process.cwd(), '../../packages/mielui/src', category))
        );
        expect(v, JSON.stringify(v, null, 2)).toHaveLength(0);
    });
});
