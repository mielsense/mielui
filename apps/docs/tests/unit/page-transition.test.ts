import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { onNavigate } from '$app/navigation';
import { setupPageTransition } from '$lib/navigation/page-transition';

vi.mock('$app/navigation', () => ({
    onNavigate: vi.fn()
}));

vi.mock('svelte', () => ({
    onDestroy: vi.fn()
}));

type Navigation = Parameters<Parameters<typeof onNavigate>[0]>[0];

const startTransition = vi.fn();

function navigate(from: string | undefined, to: string) {
    const callback = vi.mocked(onNavigate).mock.calls[0][0];
    return callback({
        from: from ? { url: new URL(from, 'https://ui.miel.my') } : null,
        to: { url: new URL(to, 'https://ui.miel.my') },
        complete: Promise.resolve()
    } as Navigation);
}

beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal(
        'matchMedia',
        vi.fn(() => ({ matches: false }))
    );
    Object.defineProperty(document, 'startViewTransition', {
        configurable: true,
        value: startTransition
    });
    startTransition.mockImplementation(() => {
        throw new Error('View transitions unavailable in this test DOM');
    });
    setupPageTransition();
});

afterEach(() => {
    Reflect.deleteProperty(document, 'startViewTransition');
    vi.unstubAllGlobals();
});

describe('page family transitions', () => {
    it.each([
        ['/', '/docs'],
        ['/docs/components/checkbox', '/'],
        ['/', '/studio'],
        ['/studio', '/'],
        ['/docs/theming', '/studio'],
        ['/studio', '/docs/components/toast']
    ])('starts a transition from %s to %s', async (from, to) => {
        await navigate(from, to);
        expect(startTransition).toHaveBeenCalledOnce();
    });

    it.each([
        ['/docs', '/docs/components/checkbox'],
        ['/docs/components/toast', '/docs/components/notch'],
        ['/studio', '/studio?preview=charts'],
        ['/studio/themes', '/studio'],
        ['/docs/theming', '/docs/theming#colors'],
        ['/preview/notch/hero', '/docs/components/notch'],
        ['/docs/components/notch', '/preview/notch/hero'],
        ['/docs-other', '/docs'],
        ['/studio-other', '/studio'],
        ['/changelog', '/docs'],
        [undefined, '/docs']
    ])('navigates immediately from %s to %s', (from, to) => {
        expect(navigate(from, to)).toBeUndefined();
        expect(startTransition).not.toHaveBeenCalled();
    });

    it('navigates immediately with reduced motion', () => {
        vi.stubGlobal(
            'matchMedia',
            vi.fn(() => ({ matches: true }))
        );
        expect(navigate('/', '/docs')).toBeUndefined();
        expect(startTransition).not.toHaveBeenCalled();
    });
});
