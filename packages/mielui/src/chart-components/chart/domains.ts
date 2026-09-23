import { tickStep } from './ticks';

export function categoryExtent(positions: readonly number[]): [number, number] {
    const sorted = [...positions].sort((a, b) => a - b);
    let gap = Infinity;
    for (let index = 1; index < sorted.length; index += 1) {
        const distance = sorted[index] - sorted[index - 1];
        if (distance > 0) {
            gap = Math.min(gap, distance);
        }
    }
    if (!Number.isFinite(gap)) {
        gap = 1;
    }
    return [(sorted[0] ?? 0) - gap / 2, (sorted.at(-1) ?? 0) + gap / 2];
}

export function valueExtent(
    rows: readonly (readonly number[])[],
    visibleColumns: readonly number[],
    barColumns: readonly number[],
    stacked: boolean
): [number, number] {
    let lower = 0;
    let upper = 0;
    for (const row of rows) {
        for (const column of visibleColumns) {
            lower = Math.min(lower, row[column]);
            upper = Math.max(upper, row[column]);
        }
        if (stacked) {
            let negative = 0;
            let positive = 0;
            for (const column of barColumns) {
                negative += Math.min(row[column], 0);
                positive += Math.max(row[column], 0);
            }
            lower = Math.min(lower, negative);
            upper = Math.max(upper, positive);
        }
    }
    if (lower === 0 && upper === 0) {
        upper = 1;
    }
    const step = tickStep(upper - lower, 5);
    return [Math.floor(lower / step) * step, Math.ceil(upper / step) * step];
}
