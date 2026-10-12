const STEP_MULTIPLES = [1, 2, 2.5, 5];

export function tickStep(span: number, count: number) {
    const rough = Math.abs(span) / Math.max(1, count - 1);
    if (!Number.isFinite(rough) || rough === 0) {
        return 1;
    }
    const magnitude = 10 ** Math.floor(Math.log10(rough));
    const normalized = rough / magnitude;
    const multiple = STEP_MULTIPLES.find((candidate) => normalized <= candidate) ?? 10;
    return multiple * magnitude;
}

export function tickCount(ticks: number) {
    return Number.isFinite(ticks) ? Math.max(2, Math.min(12, Math.floor(ticks))) : 5;
}

export function numericTicks(domain: [number, number], count: number) {
    const step = tickStep(domain[1] - domain[0], count);
    const start = Math.ceil(domain[0] / step) * step;
    const length = Math.max(0, Math.floor((domain[1] - start) / step + 0.000001) + 1);
    return Array.from({ length }, (_, index) => Number((start + index * step).toPrecision(12)));
}
