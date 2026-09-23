const REPOSITORY = 'mielsense/mielui';
const CACHE_DURATION = 5 * 60 * 1000;
let lastCount: number | null = null;
let refreshAfter = 0;
let pending: Promise<number | null> | undefined;

export async function fetchStarCount(fetchImpl: typeof fetch): Promise<number | null> {
    if (Date.now() < refreshAfter) {
        return lastCount;
    }
    if (pending) {
        return pending;
    }
    pending = refresh(fetchImpl);
    try {
        return await pending;
    } finally {
        pending = undefined;
    }
}

async function refresh(fetchImpl: typeof fetch): Promise<number | null> {
    try {
        const response = await fetchImpl(`https://api.github.com/repos/${REPOSITORY}`, {
            headers: { accept: 'application/vnd.github+json' },
            signal: AbortSignal.timeout(3000)
        });
        if (!response.ok) {
            return lastCount;
        }
        const data: unknown = await response.json();
        if (
            typeof data === 'object' &&
            data !== null &&
            'stargazers_count' in data &&
            typeof data.stargazers_count === 'number' &&
            Number.isSafeInteger(data.stargazers_count) &&
            data.stargazers_count >= 0
        ) {
            lastCount = data.stargazers_count;
        }
        return lastCount;
    } catch {
        return lastCount;
    } finally {
        refreshAfter = Date.now() + CACHE_DURATION;
    }
}
