import Spinner from '@mielui/svelte/components/spinner/spinner.svelte';
import { render } from '@testing-library/svelte';
import { flushSync } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
    vi.useRealTimers();
});

describe('Spinner', () => {
    it('renders a LoaderCircle icon with a continuous spin at the default speed', () => {
        const { container } = render(Spinner, { props: { size: 20 } });
        const spinner = container.querySelector('[data-ui="spinner"]');
        const loader = spinner?.querySelector('svg');
        expect(loader).toHaveAttribute('width', '20');
        expect(loader?.getAttribute('class')).toContain('animate-spin');
        expect(loader).toHaveStyle({ animationDuration: '850ms' });
    });

    it('renders the curved spin animation when curved is set', () => {
        const { container } = render(Spinner, { props: { curved: true } });
        const loader = container.querySelector('[data-ui="spinner"] svg');
        expect(loader?.getAttribute('class')).toContain('animate-[mielui-spinner-spin');
    });

    it('scales the spin duration with the speed multiplier', () => {
        const { container } = render(Spinner, { props: { speed: 2 } });
        const loader = container.querySelector('[data-ui="spinner"] svg');
        expect(loader).toHaveStyle({ animationDuration: '425ms' });
    });

    it('holds the checkmark, then collapses before unmounting when ready', async () => {
        vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
        const view = render(Spinner, { props: { ready: false } });
        const spinner = view.container.querySelector<HTMLElement>('[data-ui="spinner"]');
        if (!spinner) {
            throw new Error('Spinner did not render');
        }
        spinner.style.setProperty('--motion-duration-panel', '180ms');
        expect(spinner.querySelectorAll('svg')).toHaveLength(2);
        expect(spinner).toHaveAttribute('data-phase', 'loading');

        await view.rerender({ ready: true });
        expect(spinner).toHaveAttribute('data-phase', 'success');

        flushSync(() => vi.advanceTimersByTime(1999));
        expect(spinner).toHaveAttribute('data-phase', 'success');

        flushSync(() => vi.advanceTimersByTime(1));
        expect(spinner).toHaveAttribute('data-phase', 'exiting');
        expect(spinner).toHaveStyle({ width: '0px' });

        flushSync(() => vi.advanceTimersByTime(179));
        expect(spinner).toBeInTheDocument();
        flushSync(() => vi.advanceTimersByTime(1));
        expect(view.container.querySelector('[data-ui="spinner"]')).not.toBeInTheDocument();
        vi.useRealTimers();
    });
});
