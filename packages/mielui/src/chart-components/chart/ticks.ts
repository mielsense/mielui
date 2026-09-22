export function tickStep(span: number, count: number) {
    const rough = Math.abs(span) / Math.max(1, count - 1);
    if (!Number.isFinite(rough) || rough === 0) {
        return 1;
    }
    const magnitude = 10 ** Math.floor(Math.log10(rough));
    const normalized = rough / magnitude;
    const multiple =
        normalized <= 1
            ? 1
            : normalized <= 2
              ? 2
              : normalized <= 2.5
                ? 2.5
                : normalized <= 5
                  ? 5
                  : 10;
    return multiple * magnitude;
}

export function numericTicks(domain: [number, number], count: number) {
    const step = tickStep(domain[1] - domain[0], count);
    const start = Math.ceil(domain[0] / step) * step;
    const length = Math.max(0, Math.floor((domain[1] - start) / step + 0.000001) + 1);
    return Array.from({ length }, (_, index) => Number((start + index * step).toPrecision(12)));
}
