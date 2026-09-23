import { describe, expect, it } from 'vitest';
import {
    categoryExtent,
    valueExtent
} from '../../../../../packages/mielui/src/chart-components/chart/domains';

describe('chart domains', () => {
    it('pads categorical positions by their smallest positive interval', () => {
        expect(categoryExtent([10, 2, 6, 6])).toEqual([0, 12]);
        expect(categoryExtent([])).toEqual([-0.5, 0.5]);
        expect(categoryExtent([4, 4])).toEqual([3.5, 4.5]);
    });

    it('includes only rendered columns and stacks bars separately by sign', () => {
        expect(valueExtent([[3, 4, 100]], [0, 1], [0, 1], true)).toEqual([0, 8]);
        expect(valueExtent([[-3, -4, 100]], [0, 1], [0, 1], true)).toEqual([-8, 0]);
        expect(valueExtent([[3, 4, 100]], [0, 1], [0, 1], false)).toEqual([0, 4]);
    });

    it('handles datasets larger than the engine argument limit', () => {
        const positions = Array.from({ length: 200_000 }, (_, index) => index);
        expect(categoryExtent(positions)).toEqual([-0.5, 199999.5]);
        expect(
            valueExtent(
                positions.map((value) => [value]),
                [0],
                [0],
                false
            )
        ).toEqual([0, 200000]);
    });
});
