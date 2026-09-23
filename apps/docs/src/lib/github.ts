export function formatStarCount(count: number | null): string {
    if (count === null || !Number.isFinite(count) || count < 0) {
        return 'Star';
    }
    return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(
        count
    );
}
