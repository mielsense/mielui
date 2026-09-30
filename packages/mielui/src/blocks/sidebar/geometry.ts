export function finiteSize(value: number, fallback: number) {
    return Number.isFinite(value) ? Math.max(0, value) : fallback;
}

export function widthBounds(min: number, max: number) {
    const minimum = Math.max(1, finiteSize(min, 160));
    return { min: minimum, max: Math.max(minimum, finiteSize(max, 480)) };
}

export function clampWidth(value: number, min: number, max: number) {
    const bounds = widthBounds(min, max);
    return Math.min(bounds.max, Math.max(bounds.min, finiteSize(value, 256)));
}

export function resizeDirection(side: 'start' | 'end', direction: 'ltr' | 'rtl') {
    return (side === 'start' ? 1 : -1) * (direction === 'rtl' ? -1 : 1);
}
