export function normalizeValue(value: number, min: number, max: number, step: number) {
    const finiteValue = Number.isFinite(value) ? value : min;
    const bounded = Math.min(max, Math.max(min, finiteValue));
    const steps = Math.max(0, Math.floor((max - min) / step + 1e-10));
    const index = Math.min(steps, Math.max(0, Math.round((bounded - min) / step)));
    return Number((min + index * step).toPrecision(12));
}

export function valuePercent(value: number, min: number, max: number) {
    if (max <= min) {
        return 0;
    }
    return ((value - min) / (max - min)) * 100;
}
