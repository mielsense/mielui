import { describe, expect, test } from 'vitest';
import { calendar } from './calendar';

describe('Heatmap calendar', () => {
    test('orders dates, fills gaps and uses the final duplicate', () => {
        const model = calendar(
            [
                { date: '2026-09-15', count: 4 },
                { date: '2026-09-13', count: 8 },
                { date: '2026-09-15', count: 6 }
            ],
            1,
            '2026-09-15',
            0,
            'en-US'
        );
        expect(model.cells.map(({ date, count }) => ({ date, count }))).toEqual([
            { date: '2026-09-13', count: 8 },
            { date: '2026-09-14', count: 0 },
            { date: '2026-09-15', count: 6 }
        ]);
        expect(model.total).toBe(14);
    });
    test('uses UTC across leap days and clips totals to the displayed range', () => {
        const model = calendar(
            [
                { date: '2024-02-29', count: 3 },
                { date: '2024-01-01', count: 500 },
                { date: '2024-03-03', count: 500 }
            ],
            1,
            '2024-03-01',
            1,
            'en-US'
        );
        expect(model.cells[0].date).toBe('2024-02-26');
        expect(model.cells.at(-1)?.date).toBe('2024-03-01');
        expect(model.cells.find((day) => day.date === '2024-02-29')?.row).toBe(4);
        expect(model.total).toBe(3);
    });
    test('retains explicit levels and derives intensity from visible counts', () => {
        const model = calendar(
            [
                { date: '2026-09-13', count: 20 },
                { date: '2026-09-14', count: 10 },
                { date: '2026-09-15', count: 3, level: 4 }
            ],
            1,
            '2026-09-15',
            0,
            'en-US'
        );
        expect(model.cells.map((day) => day.level)).toEqual([4, 2, 4]);
    });
    test('rejects invalid dates, counts, levels and unbounded ranges', () => {
        expect(() =>
            calendar([{ date: '2025-02-29', count: 1 }], 1, undefined, 0, 'en-US')
        ).toThrow(RangeError);
        expect(() =>
            calendar([{ date: '2026-09-15', count: NaN }], 1, undefined, 0, 'en-US')
        ).toThrow(RangeError);
        expect(() =>
            calendar([{ date: '2026-09-15', count: 1, level: 5 }], 1, undefined, 0, 'en-US')
        ).toThrow(RangeError);
        expect(() => calendar([], 105, '2026-09-15', 0, 'en-US')).toThrow(RangeError);
    });
});
