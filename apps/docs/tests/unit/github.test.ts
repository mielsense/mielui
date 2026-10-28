import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { formatStarCount, githubLabel } from '#lib/github.js';

beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
});
afterEach(() => {
    vi.useRealTimers();
});

it('shares a cached count and keeps it when GitHub rate limits requests', async () => {
    const { fetchStarCount } = await import('#lib/server/github.js');
    const fetcher = vi
        .fn<typeof fetch>()
        .mockResolvedValueOnce(new Response(JSON.stringify({ stargazers_count: 73 })))
        .mockResolvedValueOnce(new Response('', { status: 403 }));
    expect(await fetchStarCount(fetcher)).toBe(73);
    expect(await fetchStarCount(fetcher)).toBe(73);
    expect(fetcher).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(300001);
    expect(await fetchStarCount(fetcher)).toBe(73);
    expect(fetcher).toHaveBeenCalledTimes(2);
});

it('rejects malformed counts without breaking the page', async () => {
    const { fetchStarCount } = await import('#lib/server/github.js');
    const fetcher = vi
        .fn<typeof fetch>()
        .mockResolvedValue(new Response(JSON.stringify({ stargazers_count: -1 })));
    expect(await fetchStarCount(fetcher)).toBeNull();
    expect(formatStarCount(null)).toBe('Star');
    expect(formatStarCount(0)).toBe('0');
    expect(formatStarCount(1200)).toBe('1.2K');
});

it('names the GitHub link with the count only when it is known', () => {
    expect(githubLabel(null)).toBe('Mielui on GitHub');
    expect(githubLabel(1200)).toBe('Mielui on GitHub, 1.2K stars');
});
