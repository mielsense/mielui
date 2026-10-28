export const GITHUB_URL = 'https://github.com/mielsense/mielui';

export function formatStarCount(count: number | null): string {
    if (count === null || !Number.isFinite(count) || count < 0) {
        return 'Star';
    }
    return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(
        count
    );
}

/** The GitHub link's accessible name, with the star count only when one is known. */
export function githubLabel(count: number | null): string {
    const stars = formatStarCount(count);
    if (stars === 'Star') {
        return 'Mielui on GitHub';
    }

    return `Mielui on GitHub, ${stars} stars`;
}
